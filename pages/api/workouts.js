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
    // find workout
    client = await MongoClient.connect(process.env.MONGO_CONNECT);
    const db = client.db();

    const workoutsCollection = db.collection("workouts");

    // get workouts from cursor
    const cursor = await workoutsCollection.find({ "workout.user_id": session.user.id });
    const workouts = await cursor.toArray();

    // sort by most recent
    workouts.sort((a, b) => {
      return new Date(b.workout.date) - new Date(a.workout.date);
    });

    // send workouts
    if (workouts) {
      return res.status(200).json(workouts);
    } else {
      return res.status(404).json({ error: "No workouts" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal Server Error" });
  }  finally {
    if (client) client.close();
  }
}
