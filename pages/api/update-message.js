import { MongoClient, ObjectId } from "mongodb";
import { getIronSession } from "iron-session";
import { ironOptions } from "../../lib/config";

export default async function handler(req, res) {
  const session = await getIronSession(req, res, ironOptions);
  if (req.method === "PUT" && session.user) {
    try {
      const client = await MongoClient.connect(process.env.MONGO_CONNECT);
      const db = client.db();

      const messagesCollection = db.collection("messages");
      const messageDb = await messagesCollection.findOneAndUpdate(
        { _id: new ObjectId(req.body.id) },
        {
          $set: { "message.message_body": req.body.message_body },
        },
        { returnDocument: "after" }
      );

      client.close();

      // check if successful
      if (messageDb) {
        await res.send(messageDb);
      } else {
        await res.status(403).json({ error: "Unable to update message." });
      }
    } catch (e) {
      console.log("error ", e);
    }
  } else {
    await res.status(403).json({ error: "Message not found." });
  }
}
