import { MongoClient, ObjectId } from 'mongodb';
import { getIronSession } from 'iron-session';
import { ironOptions } from '../../lib/config';

export default async function handler (req, res) {
	const session = await getIronSession(req, res, ironOptions)
    if (req.method === 'POST' && req.body.email_input && session.user) {
        try {
            const client = await MongoClient.connect(process.env.MONGO_CONNECT);
            const db = client.db();

            const usersCollection = db.collection('users');
			const userDb = await usersCollection.updateOne(
				{ "_id": new ObjectId(session.user.id) },
				{ 
					$set: { "user.email": req.body.email_input }
				});

			client.close();
			
			// check if successful
			if (userDb.modifiedCount === 1) {
				await res.send(JSON.stringify({ success: req.body.email_input}));
			} else {
				await res.status(403).json({error: 'Unable to update email.'});
			}
            
        } catch (e) {
			console.log('in update-email.js')
            console.log('error ', e);
        }
    } else {
		await res.status(403).json({error: 'User not found.'});
	}
}