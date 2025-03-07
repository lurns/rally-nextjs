import { MongoClient, ObjectId } from "mongodb";
import { getIronSession } from "iron-session";
import { ironOptions } from "../../lib/config";

export default async function handler(req, res) {
  const session = await getIronSession(req, res, ironOptions);
  let client;

  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  if (!req.body.message_body) {
    return res.status(400).json({ error: "Incomplete request body." });
  }

  try {
    client = await MongoClient.connect(process.env.MONGO_CONNECT);
    const db = client.db();

    const messagesCollection = db.collection("messages");
    const messageDb = await messagesCollection.findOneAndUpdate(
      {
        _id: new ObjectId(req.body.id),
        "message.user_id": session.user.id,
      },
      {
        $set: { "message.message_body": req.body.message_body },
      },
      { returnDocument: "after" }
    );

    // check if successful
    if (!messageDb)
      return res.status(404).json({ error: "Unable to update message." });
    
    return res.status(200).send(messageDb);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (client) client.close();
  }
}
