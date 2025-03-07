import { MongoClient, ObjectId } from "mongodb";
import { getIronSession } from "iron-session";
import { ironOptions } from "../../lib/config";

export default async function handler(req, res) {
  const session = await getIronSession(req, res, ironOptions);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  if (!req.body.pic_url) {
    return res.status(400).json({ error: "Incomplete request body (no picture attached)." });
  }

  let client;
  try {
    client = await MongoClient.connect(process.env.MONGO_CONNECT);
    const db = client.db();
    const userId = session.user.id;

    const usersCollection = db.collection("users");
    const userDb = await usersCollection.findOne({ _id: new ObjectId(userId) });

    if (!userDb) return res.status(404).json({ error: "Unable to find user." });

    // attach pic
    await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: { "user.pic_url": req.body.pic_url },
      }
    );

    return res.status(201).json({ message: "Updated photo in db." });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (client) client.close();
  }
}
