// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectMongo } from "../../db/connectDb";
import Translation from "../../db/models/Translation";

import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { translationId, bg, en } = req.body;

  const messages = ["Успешно сменено"];
  const randomNum = Math.floor(Math.random() * messages.length);

  try {
    await connectMongo();

    await Translation.updateOne(
      { "translations._id": new ObjectId(translationId) },
      { $set: { "translations.$.bg": bg, "translations.$.en": en } }
    );
    const data = await Translation.findOne({
      "translations._id": new ObjectId(translationId),
    });
    let found = {};
    data.translations.forEach((data) => {
      if (data._id == translationId) {
        found = data;
      }
    });
    res.json({ message: messages[randomNum], data: found });
  } catch (err) {
    console.log(err);
    res.json({ error: err.error });
  }
}
