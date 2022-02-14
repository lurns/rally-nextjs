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
		const userDb = await usersCollection.findOne({"_id":ObjectId(req.session.user.id)});
		userDb.user.password='';
		client.close();

		await res.json(userDb);
		
	} catch (e) {
		console.log('err retrieving user');
		return null;
	}
}