import { MongoClient, ObjectId } from 'mongodb';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from '../../lib/config';

export default withIronSessionApiRoute(handler, ironOptions);

async function handler (req, res) {
    if (req.method === 'POST' && req.body.message_type && req.body.message_body) {
        try {
			const date = new Date();
			
			const message = {
				message_type: req.body.message_type,
				message_body: req.body.message_body,
				user_id: req.body.user_id, // or req.session
				date: date,
			}

            // add to db
            const client = await MongoClient.connect(process.env.MONGO_CONNECT);
            const db = client.db();

            const messagesCollection = db.collection('messages');
			const savedMessage = await messagesCollection.insertOne({message});

			console.log(savedMessage);

			client.close();

			await res.status(201).json({message: 'new message added'});
            
        } catch (e) {
            console.log('error ', e);
			await res.status(403).json({error: 'unable to add message'});
        }
    } 
}