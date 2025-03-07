import { MongoClient, ObjectId } from "mongodb";
import { getIronSession } from "iron-session";
import { ironOptions } from "../../lib/config";

export default async function handler(req, res) {
  const session = await getIronSession(req, res, ironOptions);
  let client;

  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    client = await MongoClient.connect(process.env.MONGO_CONNECT);
    const db = client.db();

    const messagesCollection = db.collection("messages");
    const deleteQuery = {
      _id: new ObjectId(req.body.id),
      "message.user_id": session.user.id,
    };
    const messageDb = await messagesCollection.deleteOne(deleteQuery);

    // check if successful
    if (messageDb.deletedCount === 1) return res.status(200).end();

    return res.status(404).json({ error: "Unable to delete message." });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (client) client.close();
  }
}
