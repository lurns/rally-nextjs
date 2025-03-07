import { MongoClient, ObjectId } from 'mongodb';
import { getIronSession } from 'iron-session';
import { ironOptions } from '../../lib/config';

export default async function handler (req, res) {
	const session = await getIronSession(req, res, ironOptions)
	let client;

	// find user
	try {
		client = await MongoClient.connect(process.env.MONGO_CONNECT);
		const db = client.db();

		const usersCollection = db.collection('users');
		const cursor = await usersCollection
			.find({"_id": new ObjectId(session.user.id)})
			.project({"user.password": 0})
			.limit(1);

		const userDb = await cursor.toArray();

		return res.status(200).json(userDb[0]);
	} catch (e) {
		console.log('err retrieving user');
    console.log(e);
    return res.status(500).json({ error: "Internal Server Error" });
	} finally {
    if (client) client.close();
  }
}