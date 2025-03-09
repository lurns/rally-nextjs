import { MongoClient, ObjectId } from "mongodb";
import { getIronSession } from "iron-session";
import { ironOptions } from "../../lib/config";

export default async function handler(req, res) {
  const session = await getIronSession(req, res, ironOptions);
  let client;

  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!req.body.nickname_input) {
    return res.status(400).json({ error: "Invalid nickname." });
  }

  try {
    client = await MongoClient.connect(process.env.MONGO_CONNECT);
    const db = client.db();

    const usersCollection = db.collection("users");
    const userDb = await usersCollection.updateOne(
      { _id: new ObjectId(session.user.id) },
      {
        $set: { "user.nickname": req.body.nickname_input },
      }
    );

    // check if successful
    if (userDb.modifiedCount === 1)
      return res
        .status(200)
        .send(JSON.stringify({ success: req.body.nickname_input }));

    return res.status(404).json({ error: "Unable to update nickname." });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (client) client.close();
  }
}
