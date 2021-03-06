import { MongoClient, ObjectId } from "mongodb";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../lib/config";

export default withIronSessionApiRoute(handler, ironOptions);

async function handler(req, res) {
  if (req.method === "GET" && req.session.user) {
    try {
      // find workout
      const client = await MongoClient.connect(process.env.MONGO_CONNECT);
      const db = client.db();

      const workoutsCollection = db.collection("workouts");

      // get workouts from cursor
      const cursor = await workoutsCollection.find({ "workout.user_id": req.session.user.id });
      const workouts = await cursor.toArray();

      // sort by most recent
      workouts.sort((a, b) => {
        return b.workout.date - a.workout.date;
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
