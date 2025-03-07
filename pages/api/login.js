import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import { getIronSession } from "iron-session";
import { ironOptions } from "../../lib/config";

export default async function handler(req, res) {
  const session = await getIronSession(req, res, ironOptions);
  let client;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!req.body.password || !req.body.email) {
    return res.status(400).json({ error: "Incomplete request body." });
  }

  try {
		// find user in db
    client = await MongoClient.connect(process.env.MONGO_CONNECT);
    const db = client.db();

    const usersCollection = db.collection("users");
    const userDb = await usersCollection.findOne({
      "user.email": req.body.email,
    });

    if (!userDb) return res.status(404).json({ error: "User not found." });

    // if user found, compare
    var result = await bcrypt.compare(req.body.password, userDb.user.password);

    if (!result) return res.status(400).json({ error: "Incorrect password." });

    // create session
    session.user = { id: userDb._id };

    await session.save();
    return res.status(200).send(JSON.stringify(session.user));
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (client) client.close();
  }
}
