import { defineType } from "sanity";

export const localizedString = defineType({
  name: "localizedString",
  title: "Localized String",
  type: "object",
  fields: [
    {
      name: "en",
      title: "English",
      type: "string",
    },
    {
      name: "hi",
      title: "Hindi",
      type: "string",
    },
  ],
});

export const localizedText = defineType({
  name: "localizedText",
  title: "Localized Text",
  type: "object",
  fields: [
    {
      name: "en",
      title: "English",
      type: "text",
    },
    {
      name: "hi",
      title: "Hindi",
      type: "text",
    },
  ],
});
