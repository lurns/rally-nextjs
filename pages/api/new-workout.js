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
			const savedWorkout = await workoutsCollection.insertOne({workout});

			console.log(savedWorkout);

			client.close();

			await res.status(201).json({message: 'new workout added'});
            
        } catch (e) {
            console.log('error ', e);
        }
    } 
}