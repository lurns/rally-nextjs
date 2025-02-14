import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import { getIronSession } from 'iron-session';
import { ironOptions } from '../../lib/config';

export default async function handler (req, res) {
		const session = await getIronSession(req, res, ironOptions)
    if (req.method === 'POST' && req.body.password && req.body.email) {
        // make sure user matches in db
        try {
            // find user
            const client = await MongoClient.connect(process.env.MONGO_CONNECT);
            const db = client.db();

            const usersCollection = db.collection('users');
			const userDb = await usersCollection.findOne({"user.email":req.body.email})

			client.close();

			// if user found, compare
			if (userDb) {
				var result = await bcrypt.compare(req.body.password, userDb.user.password);
				
				// create session
				if (result) {
						session.user = {
							id: userDb._id,
						}

						await session.save().then(data => {
							return res.send(JSON.stringify(session.user));
						});
				}
			} else {
				// give err
				await res.status(403).json({error: 'User not found.'});
			}
            
        } catch (e) {
					console.log('in login.js')
					console.log('error ', e);
        }
    } 
}