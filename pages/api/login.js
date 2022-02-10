import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

const handler = async (req, res) => {
    if (req.method === 'POST' && req.body.password && req.body.email) {
        // make sure user matches in db
        try {
            // find user
            const client = await MongoClient.connect(process.env.MONGO_CONNECT);
            const db = client.db();

            const usersCollection = db.collection('users');
			const userDb = await usersCollection.findOne({"user.email":req.body.email})

			client.close();

			// if user found, compare
			if (userDb) {
				var result = await bcrypt.compare(req.body.password, userDb.user.password);
				
				// create session
				if (result) {
					await res.status(201).json({message: 'user found'});
				}
			}

			// give err
			await res.status(403).json({error: 'User not found.'});

            
        } catch (e) {
            console.log('error', e);
        }

    }

}

export default handler;