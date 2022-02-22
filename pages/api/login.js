import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from '../../lib/config';

export default withIronSessionApiRoute(handler, ironOptions);

async function handler (req, res) {
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
					req.session.user = {
						id: userDb._id,
					}

					await req.session.save();
					// console.log(req.session);
					await res.json(req.session.user);
				}
			}

			// give err
			await res.status(403).json({error: 'User not found.'});
            
        } catch (e) {
            console.log('error ', e);
        }
    } 
}