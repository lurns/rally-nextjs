import { MongoClient } from 'mongodb';
import { getIronSession } from 'iron-session';
import { ironOptions } from '../../lib/config';

export default async function handler (req, res) {
	const session = await getIronSession(req, res, ironOptions)
    if (req.method === 'POST' && req.body.workout_type && req.body.duration) {
        try {
			const date = new Date();
			
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
			client.close();

			await res.status(201).json(addedWorkout);
            
        } catch (e) {
            console.log('error ', e);
			await res.status(403).json({error: 'unable to add workout'});
        }
    } 
}