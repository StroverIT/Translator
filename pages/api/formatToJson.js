// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectMongo } from "../../db/connectDb";
import Translation from "../../db/models/Translation";

import fs from "fs";

export default async function handler(req, res) {
  const messages = ["Успешно форматирахте файловете!"];
  const randomNum = Math.floor(Math.random() * messages.length);

  try {
    await connectMongo();

    const translations = await Translation.find({});

    translations.forEach((dataPage) => {
      const jsonFile = {};
      dataPage.translations.forEach((translation) => {
        jsonFile[translation.bg] = translation.en;
      });
      fs.writeFile(
        `data/${dataPage.page}.json`,
        JSON.stringify(jsonFile),
        "utf8",
        (a, b) => {
          console.log(a, b);
        }
      );
    });
    // const jsonData =
    res.json({ message: messages[randomNum] });
  } catch (err) {
    console.log(err);
    res.json({ error: err.error });
  }
}
