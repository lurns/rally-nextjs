import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import { getIronSession } from 'iron-session'
import { ironOptions } from '../../lib/config';

export default async function handler (req, res) {
	const session = await getIronSession(req, res, ironOptions)
    if (req.method === 'POST' && req.body.oldPass && req.body.newPass &&  req.body.confirmNewPass && session.user) {
        try {
			// make sure passwords match
			if (req.body.newPass !== req.body.confirmNewPass) {
				throw new Error();
			}

            const client = await MongoClient.connect(process.env.MONGO_CONNECT);
            const db = client.db();

            const usersCollection = db.collection('users');

			// make sure old password matches one in db
			const userDb = await usersCollection.findOne({"_id": new ObjectId(session.user.id)});

			if (userDb) {
				var result = await bcrypt.compare(req.body.oldPass, userDb.user.password);

				// set new password
				if (result) {
					bcrypt.genSalt(10, async (err, salt) => {
						bcrypt.hash(req.body.newPass, salt, async (err, hash) => {
							const setUserPassDb = await usersCollection.updateOne(
								{ "_id": new ObjectId(session.user.id) },
								{ 
									$set: { "user.password": hash }
							});

							client.close();

							if (setUserPassDb.modifiedCount === 1) {
								await res.send(JSON.stringify({ success: 'success'}));
							} else {
								throw new Error();
							}
						});
					})
				}
			} else {
				client.close();
				throw new Error();
			}
     
        } catch (e) {
			console.log('in update-nickname.js')
            console.log('error ', e);
			await res.status(403).json({error: 'Unable to update nickname.'});
        }
    } else {
		await res.status(403).json({error: 'User not found.'});
	}
}