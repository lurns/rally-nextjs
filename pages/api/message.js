import { MongoClient } from 'mongodb';
import { getIronSession } from 'iron-session';
import { ironOptions } from '../../lib/config';

export default async function handler (req, res) {
	const session = await getIronSession(req, res, ironOptions)
    if (req.method === 'POST' && req.body.message_type && session.user.id) {
        try {
			const messageType = req.body.message_type;

            // add to db
            const client = await MongoClient.connect(process.env.MONGO_CONNECT);
            const db = client.db();

            const messagesCollection = db.collection('messages');

			const cursor = await messagesCollection
				.find({ 
					"message.user_id": session.user.id, 
					"message.message_type": messageType,
				});

			const messages = await cursor.toArray();
			//console.log(messages);

			client.close();

			// get a random message / send default
			if (messages.length === 0) {
				if (messageType === 'ON_TRACK') {
					return res.status(200).json({ message: `I'm doing great!` });
				} else if (messageType === 'MOTIVATIONAL') {
					return res.status(200).json({ message: `It's about time to get back out there` });
				} else if (messageType === 'DO_BETTER') {
					return res.status(200).json({ message: `Liiiiiiike any day now` });
				} else {
					return res.status(200).json({ message: `Never give up, never surrender!` });
				}
			}

			// only one entry
			if (messages.length === 1) {
				return res.status(201).json({ message: messages[0].message.message_body });
			}

			// choose random
			if (messages.length > 1) {
				const index = Math.floor(Math.random() * messages.length);
				return res.status(201).json({ message: messages[index].message.message_body });
			}

            
        } catch (e) {
            console.log('error ', e);
						return res.status(403).json({error: 'unable to get message'});
        }
    } 
}