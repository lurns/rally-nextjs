import { MongoClient, ObjectId } from 'mongodb';
import { getIronSession } from 'iron-session';
import { ironOptions } from '../../lib/config';

export default async function handler (req, res) {
  const session = await getIronSession(req, res, ironOptions);

  if (req.method === "PUT" && session.user) {
    try {
      const client = await MongoClient.connect(process.env.MONGO_CONNECT);
      const db = client.db();

      const workoutsCollection = db.collection("workouts");
      const workoutDb = await workoutsCollection.findOneAndUpdate(
				{ "_id": new ObjectId(req.body.id) },
				{ 
					$set: { 
            "workout.workout_type": req.body.workout_type, 
            "workout.duration": req.body.duration,
            "workout.date": req.body.date
          }
				},
        { returnDocument: "after" });

      client.close();

			// check if successful
			if (workoutDb) {
				await res.send(workoutDb);
			} else {
				await res.status(403).json({error: 'Unable to update workout.'});
			}
    } catch (e) {
      console.log("error ", e);
    }
  }
}