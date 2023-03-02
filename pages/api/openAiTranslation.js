import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openAI = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { text } = req.body;

  const messages = ["Успешно премахнато"];
  const randomNum = Math.floor(Math.random() * messages.length);
  console.log(text);
  try {
    console.log(process.env.OPEN_AI_KEY);
    const response = await openAI.createCompletion({
      model: "text-davinci-003",
      prompt: `
      translate this:${text}. from Bulgarian to English
      `,
      temperature: 0.3,
      max_tokens: 100,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    const textChat = response.data.choices[0].text;
    res.json({ text: textChat });
  } catch (err) {
    console.log(err);
    res.json({ error: err.error });
  }
}
// Аз съм българче и обичам наще планини зелени
