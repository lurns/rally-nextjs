import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import { getIronSession } from "iron-session";
import { ironOptions } from "../../lib/config";

const validateRequest = (oldPass, newPass, confirmNewPass) => {
  if (!oldPass || !newPass || !confirmNewPass)
    return "Incomplete request body.";

  if (newPass !== confirmNewPass) return "Passwords do not match.";

  return null;
};

export default async function handler(req, res) {
  const session = await getIronSession(req, res, ironOptions);
  let client;

  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // validations
  const { oldPass, newPass, confirmNewPass } = req.body;
  const validationError = validateRequest(oldPass, newPass, confirmNewPass);

  if (validationError) return res.status(400).json({ error: validationError });

  try {
    client = await MongoClient.connect(process.env.MONGO_CONNECT);
    const db = client.db();

    const usersCollection = db.collection("users");

    // get user
    const userDb = await usersCollection.findOne({
      _id: new ObjectId(session.user.id),
    });

    if (!userDb) return res.status(404).json({ error: "User not found." });

    // make sure old password matches one in db
    var result = await bcrypt.compare(req.body.oldPass, userDb.user.password);

    if (!result)
      return res
        .status(400)
        .json({ error: "Incorrect input for current password" });

    // set new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPass, salt);

    const setUserPassDb = await usersCollection.updateOne(
      { _id: new ObjectId(session.user.id) },
      {
        $set: { "user.password": hashedPassword },
      }
    );

    if (setUserPassDb.modifiedCount === 1)
      return res.status(200).send(JSON.stringify({ success: "success" }));

    return res.status(404).json({ error: "Unable to update password." });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (client) client.close();
  }
}
