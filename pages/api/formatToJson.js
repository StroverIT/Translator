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
      const jsonFileEn = {};
      const jsonFileBg = {};

      dataPage.translations.forEach((translation) => {
        jsonFileEn[translation.bg] = translation.en;
        jsonFileBg[translation.en] = translation.bg;
      });
      fs.writeFile(
        `data/en/${dataPage.page}.json`,
        JSON.stringify(jsonFileEn),
        "utf8",
        (a, b) => {
          console.log(a, b);
        }
      );
      fs.writeFile(
        `data/bg/${dataPage.page}.json`,
        JSON.stringify(jsonFileBg),
        "utf8",
        (a, b) => {
          // console.log(a, b);
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
