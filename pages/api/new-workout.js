import { MongoClient, ObjectId } from 'mongodb';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from '../../lib/config';

export default withIronSessionApiRoute(handler, ironOptions);

async function handler (req, res) {
    if (req.method === 'POST' && req.body.workout_type && req.body.duration) {
        try {
			const date = new Date();
			console.log('date is ' + date);
			
			const workout = {
				workout_type: req.body.workout_type,
				duration: req.body.duration,
				user_id: req.body.user_id, // or req.session
				date: date,
			}

            // add to db
            const client = await MongoClient.connect(process.env.MONGO_CONNECT);
            const db = client.db();

            const workoutsCollection = db.collection('workouts');
			const saveWorkout = await workoutsCollection.insertOne({workout});

			// return new workouts
			const addedWorkout = await workoutsCollection.findOne({ "_id": saveWorkout.insertedId });
			console.log(addedWorkout)

			client.close();

			await res.status(201).json(addedWorkout);
            
        } catch (e) {
            console.log('error ', e);
			await res.status(403).json({error: 'unable to add workout'});
        }
    } 
}