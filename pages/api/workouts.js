import { MongoClient, ObjectId } from "mongodb";
import { getIronSession } from "iron-session";
import { ironOptions } from "../../lib/config";

export default async function handler(req, res) {
  const session = await getIronSession(req, res, ironOptions)

  if (req.method === "GET" && session.user) {
    try {
      // find workout
      const client = await MongoClient.connect(process.env.MONGO_CONNECT);
      const db = client.db();

      const workoutsCollection = db.collection("workouts");

      // get workouts from cursor
      const cursor = await workoutsCollection.find({ "workout.user_id": session.user.id });
      const workouts = await cursor.toArray();

      // sort by most recent
      workouts.sort((a, b) => {
        return new Date(b.workout.date) - new Date(a.workout.date);
      });

      client.close();

      // send workouts
      if (workouts) {
        await res.status(200).json(workouts);
      } else {
        // give err
        await res.status(403).json({ error: "No workouts" });
      }
    } catch (e) {
      console.log("in workouts.js");
      console.log("error ", e);
    }
  }
}
