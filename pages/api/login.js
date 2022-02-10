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

			console.log('retrieved ' + JSON.stringify(userDb));


			// if user found, compare
			if (userDb) {
				console.log(userDb.user.password);
				var result = await bcrypt.compare(req.body.password, userDb.user.password);
				console.log('the verdict' + result);
			}

			client.close();

            await res.status(201).json({message: 'user found'});
            
        } catch (e) {
            console.log('error', e);
        }

    }

}

export default handler;