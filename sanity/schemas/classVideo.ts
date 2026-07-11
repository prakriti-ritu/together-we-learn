import { defineType, defineField } from "sanity";

export const classVideo = defineType({
  name: "classVideo",
  title: "Class Video",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Custom Thumbnail (optional)",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "title.en" },
    prepare({ title }) {
      return { title: title || "Untitled Video" };
    },
  },
});
