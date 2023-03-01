// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectMongo } from "../../db/connectDb";
import Translation from "../../db/models/Translation";

import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { translationId, pageId } = req.body;

  console.log(pageId, translationId);
  const messages = ["Успешно премахнато"];
  const randomNum = Math.floor(Math.random() * messages.length);

  try {
    await connectMongo();

    await Translation.updateOne(
      { _id: new ObjectId(pageId) },
      { $pull: { translations: { _id: new ObjectId(translationId) } } }
    );

    res.json({ message: messages[randomNum] });
  } catch (err) {
    console.log(err);
    res.json({ error: err.error });
  }
}
