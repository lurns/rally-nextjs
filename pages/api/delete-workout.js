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
    const workoutsCollection = db.collection("workouts");

    const deleteQuery = {
      _id: new ObjectId(req.body.id),
      "workout.user_id": session.user.id,
    };

    const workoutDb = await workoutsCollection.deleteOne(deleteQuery);

    if (workoutDb.deletedCount === 1) return res.status(200).end();

    return res.status(404).json({ error: "Unable to delete workout." });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (client) client.close();
  }
}
