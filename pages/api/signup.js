import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

const validateRequest = (nickname, email, pass, confirmPass) => {
  if (!nickname || !email || !pass || !confirmPass)
    return "Incomplete request body.";

  if (pass !== confirmPass) return "Passwords do not match.";

  // check that email is vaguely valid format
  const emailRegex = /^\S+@\S+\.\S+$/
  if (!emailRegex.test(email)) return "Invalid email.";

  return null;
};

export default async function handler(req, res) {
  let client;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  // validations
  const { nickname, email, password, confirmPassword } = req.body;
  const validationError = validateRequest(nickname, email, password, confirmPassword);

  if (validationError) return res.status(400).json({ error: validationError });

  try {
    client = await MongoClient.connect(process.env.MONGO_CONNECT);
    const db = client.db();

    const usersCollection = db.collection("users");

    // check that user is not already in database
    const userDb = await usersCollection.findOne({
      "user.email": req.body.email,
    });

    if (userDb) return res.status(400).json({ error: `${email} is an existing user.` });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user in db
    const user = {
      nickname: nickname,
      email: email,
      password: hashedPassword,
    };

    await usersCollection.insertOne({ user });

    return res.status(201).json({ message: "New user added." });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (client) client.close();
  }
}
