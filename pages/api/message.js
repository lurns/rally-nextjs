import { MongoClient } from "mongodb";
import { getIronSession } from "iron-session";
import { ironOptions } from "../../lib/config";
import { MessageType } from "../../constants/messageType";

export default async function handler(req, res) {
  const session = await getIronSession(req, res, ironOptions);
  let client;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  if (!req.body.message_type) {
    return res.status(400).json({ error: "Incomplete request body." });
  }

  try {
    const messageType = req.body.message_type;

    // find message type
    client = await MongoClient.connect(process.env.MONGO_CONNECT);
    const db = client.db();

    const messagesCollection = db.collection("messages");

    const cursor = await messagesCollection.find({
      "message.user_id": session.user.id,
      "message.message_type": messageType,
    });

    const messages = await cursor.toArray();

    // send default if user has no matching message types
    if (messages.length === 0) {
      switch (messageType) {
        case MessageType.ON_TRACK:
          return res.status(200).json({ message: `I'm doing great!` });
        case MessageType.MOTIVATIONAL:
          return res
            .status(200)
            .json({ message: `It's about time to get back out there` });
        case MessageType.DO_BETTER:
          return res.status(200).json({ message: `Liiiiiiike any day now` });
        case MessageType.DO_BETTER_ER:
          return res
            .status(200)
            .json({ message: `Never give up, never surrender!` });
        default:
          return res
            .status(200)
            .json({ message: `Working hard or hardly working?` });
      }
    }

    // only one entry
    if (messages.length === 1) {
      return res
        .status(201)
        .json({ message: messages[0].message.message_body });
    }

    // choose random
    if (messages.length > 1) {
      const index = Math.floor(Math.random() * messages.length);
      return res
        .status(201)
        .json({ message: messages[index].message.message_body });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal Server Error" });
  }  finally {
    if (client) client.close();
  }
}
