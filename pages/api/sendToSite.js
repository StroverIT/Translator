// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fse from "fs-extra";

export default async function handler(req, res) {
  const messages = ["Успешноо изпратихте файловете!"];
  const randomNum = Math.floor(Math.random() * messages.length);

  const srcDir = "data";
  const destDir = process.env.SITE_PATH;

  try {
    fse.copySync(srcDir, destDir, { overwrite: true });

    // const jsonData =
    res.json({ message: messages[randomNum] });
  } catch (err) {
    console.log(err);
    res.json({ error: err.error });
  }
}
