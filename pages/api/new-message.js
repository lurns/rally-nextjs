import { MongoClient } from "mongodb";
import { getIronSession } from "iron-session";
import { ironOptions } from "../../lib/config";

export default async function handler(req, res) {
  const session = await getIronSession(req, res, ironOptions);
  let client;
  
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  if (!req.body.message_type || !req.body.message_body) {
    return res.status(400).json({ error: "Incomplete request body." });
  }

  try {
    const date = new Date();

    const message = {
      message_type: req.body.message_type,
      message_body: req.body.message_body,
      user_id: session.user.id,
      date: date,
    };

    // add to db
    client = await MongoClient.connect(process.env.MONGO_CONNECT);
    const db = client.db();

    const messagesCollection = db.collection("messages");
    const savedMessage = await messagesCollection.insertOne({ message });

    return res.status(201).send({ _id: savedMessage.insertedId, message });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (client) client.close();
  }
}
