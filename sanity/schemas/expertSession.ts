import { defineType, defineField } from "sanity";

export const expertSession = defineType({
  name: "expertSession",
  title: "Expert Session",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedText",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
    }),
    defineField({
      name: "speaker",
      title: "Speaker Name",
      type: "string",
    }),
    defineField({
      name: "photo",
      title: "Speaker Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL (YouTube)",
      type: "url",
    }),
  ],
  preview: {
    select: { title: "title.en", speaker: "speaker", date: "date" },
    prepare({ title, speaker, date }) {
      return {
        title: title || "Untitled Session",
        subtitle: `${speaker || ""} ${date ? `- ${date}` : ""}`,
      };
    },
  },
});
