import { MongoClient, ObjectId } from 'mongodb';
import { getIronSession } from 'iron-session';
import { ironOptions } from '../../lib/config';

export default async function handler (req, res) {
  const session = await getIronSession(req, res, ironOptions);

  if (req.method === "DELETE" && session.user) {
    try {
      const client = await MongoClient.connect(process.env.MONGO_CONNECT);
      const db = client.db();

      const messagesCollection = db.collection("messages");
      const messageDb = await messagesCollection.deleteOne(
				{ "_id": new ObjectId(req.body.id) }
      );

      client.close();

			// check if successful
			if (messageDb) {
				await res.send(messageDb);
			} else {
				await res.status(403).json({error: 'Unable to delete message.'});
			}
    } catch (e) {
      console.log("error ", e);
    }
  }
}