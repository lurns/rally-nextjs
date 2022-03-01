import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from '../../lib/config';

export default withIronSessionApiRoute(handler, ironOptions);

async function handler (req, res) {
    if (req.method === 'POST' && req.body.pic_url) {
        // make sure user matches in db
        try {
            // find user
            const client = await MongoClient.connect(process.env.MONGO_CONNECT);
            const db = client.db();
			const id = req.session.user.id;

            const usersCollection = db.collection('users');
			const userDb = await usersCollection.findOne({"_id":ObjectId(id)});

			// if user found, attach pic
			if (userDb) {
				await usersCollection.updateOne({"_id": ObjectId(id)}, {
					$set: {"user.pic_url": req.body.pic_url}
				});

				client.close();

				await res.json({message: 'Updated photo in db.'});
				res.end();
			} else {
				throw new Error;
			}
        } catch (e) {
			// give err
			console.log('in api/new-pic')
            console.log('error ', e);
			await res.status(403).json({error: 'User not found.'});
        }
    } 
}