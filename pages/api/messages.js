import { MongoClient } from "mongodb";
import { getIronSession } from "iron-session";
import { ironOptions } from "../../lib/config";

export default async function handler(req, res) {
  const session = await getIronSession(req, res, ironOptions);
  let client;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  try {
    // find all messages for a user
    client = await MongoClient.connect(process.env.MONGO_CONNECT);
    const db = client.db();

    const messagesCollection = db.collection("messages");

    // get messages from cursor
    const cursor = await messagesCollection.find({
      "message.user_id": session.user.id,
    });
    const messages = await cursor.toArray();

    // sort by most recent
    messages.sort((a, b) => {
      return new Date(b.message.date) - new Date(a.message.date);
    });

    // send messages
    if (!messages) return res.status(404).json({ error: "No messages found." });

    return res.status(200).json(messages);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (client) client.close();
  }
}
