import { Schema, model, models } from "mongoose";

const TranslationSchema = new Schema({
  page: String,

  translations: {
    type: Array,
    default: [],
  },

  createdAt: {
    type: String,
    default: () => {
      return new Date(Date.now());
    },
  },
});

const Translation =
  models.Translation || model("Translation", TranslationSchema);

export default Translation;
