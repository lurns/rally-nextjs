import { MongoClient, ObjectId } from 'mongodb';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from '../../lib/config';

export default withIronSessionApiRoute(handler, ironOptions);

async function handler (req, res) {
	try {
		// find user
		const client = await MongoClient.connect(process.env.MONGO_CONNECT);
		const db = client.db();

		const usersCollection = db.collection('users');
		const cursor = await usersCollection
			.find({"_id":ObjectId(req.session.user.id)})
			.project({"user.password": 0})
			.limit(1);

		const userDb = await cursor.toArray();
		// console.log(userDb)
		client.close();

		await res.json(userDb[0]);
		
	} catch (e) {
		console.log('err retrieving user');
		return null;
	}
}