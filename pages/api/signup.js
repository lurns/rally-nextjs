import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

const handler = async (req, res) => {
    if (req.method === 'POST' && req.body.password === req.body.confirmPassword) {
        // can do addtl user validation before saving user
        try {
            bcrypt.genSalt(10, async (err, salt) => {
                bcrypt.hash(req.body.password, salt, async (err, hash) => {
                    const user = {
                        nickname: req.body.nickname,
                        email: req.body.email,
                        password: hash
                    }

                    const client = await MongoClient.connect(process.env.MONGO_CONNECT);
                    const db = client.db();

                    const usersCollection = db.collection('users');

                    const result = await usersCollection.insertOne({user});

                    console.log(result);
                    client.close();
                })
            })

            await res.status(201).json({message: 'new user added'});
            
        } catch (e) {
            console.log('error', e);
        }

    }

}

export default handler;