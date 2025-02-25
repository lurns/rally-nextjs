import { MongoClient, ObjectId } from "mongodb";
import { getIronSession } from "iron-session";
import { ironOptions } from "../../lib/config";

export default async function handler(req, res) {
  const session = await getIronSession(req, res, ironOptions)

  if (req.method === "GET" && session.user) {
    try {
      // find all messages for a user
      const client = await MongoClient.connect(process.env.MONGO_CONNECT);
      const db = client.db();

      const messagesCollection = db.collection("messages");

      // get messages from cursor
      const cursor = await messagesCollection.find({ "message.user_id": session.user.id });
      const messages = await cursor.toArray();

      // sort by most recent
      messages.sort((a, b) => {
        return new Date(b.message.date) - new Date(a.message.date);
      });

      client.close();

      // send workouts
      if (messages) {
        await res.status(200).json(messages);
      } else {
        // give err
        await res.status(403).json({ error: "No messages" });
      }
    } catch (e) {
      console.log("in messages.js");
      console.log("error ", e);
    }
  }
}
