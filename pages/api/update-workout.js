import { MongoClient, ObjectId } from "mongodb";
import { getIronSession } from "iron-session";
import { ironOptions } from "../../lib/config";

export default async function handler(req, res) {
  const session = await getIronSession(req, res, ironOptions);
  let client;

  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!req.body.workout_type || !req.body.duration || !req.body.date) {
    return res.status(400).json({ error: "Incomplete request body." });
  }

  try {
    client = await MongoClient.connect(process.env.MONGO_CONNECT);
    const db = client.db();

    const workoutsCollection = db.collection("workouts");
    const workoutDb = await workoutsCollection.findOneAndUpdate(
      { _id: new ObjectId(req.body.id), "workout.user_id": session.user.id },
      {
        $set: {
          "workout.workout_type": req.body.workout_type,
          "workout.duration": req.body.duration,
          "workout.date": req.body.date,
        },
      },
      { returnDocument: "after" }
    );

    // check if successful
    if (!workoutDb)
      return res.status(403).json({ error: "Unable to update workout." });

    return res.status(200).send(workoutDb);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (client) client.close();
  }
}
