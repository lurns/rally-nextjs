import { MongoClient } from "mongodb";
import { getIronSession } from "iron-session";
import { ironOptions } from "../../lib/config";

export default async function handler(req, res) {
  const session = await getIronSession(req, res, ironOptions);
  let client;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  if (!req.body.workout_type || !req.body.duration) {
    return res.status(400).json({ error: "Incomplete request body." });
  }

  try {
    const date = new Date();

    const workout = {
      workout_type: req.body.workout_type,
      duration: req.body.duration,
      user_id: session.user.id,
      date: date,
    };

    // add to db
    client = await MongoClient.connect(process.env.MONGO_CONNECT);
    const db = client.db();

    const workoutsCollection = db.collection("workouts");
    const savedWorkout = await workoutsCollection.insertOne({ workout });

    // return new workouts
    const addedWorkout = await workoutsCollection.findOne({
      _id: savedWorkout.insertedId,
    });

    return res.status(201).json(addedWorkout);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (client) client.close();
  }
}
