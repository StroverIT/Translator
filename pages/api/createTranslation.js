// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectMongo } from "../../db/connectDb";
import Translation from "../../db/models/Translation";

import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { page, bg, en } = req.body;

  const messages = [
    "Справяте се страхотно!",
    "Справяте се невероятно!",
    "Браво Хриси!",
    "Ще стане човек от теб!",
  ];
  const randomNum = Math.floor(Math.random() * messages.length);

  try {
    await connectMongo();

    if (!page || !bg || !en) {
      return res.json({ error: "Моля попълнете всички полета" });
    }

    const data = { bg, en, _id: new ObjectId() };

    const isExisting = await Translation.findOne({ page });

    if (!isExisting) {
      await Translation.create({ page });
    }

    await Translation.updateOne({ page }, { $push: { translations: data } });

    res.json({ message: messages[randomNum] });
  } catch (err) {
    res.json({ error: err.error });
  }
}
