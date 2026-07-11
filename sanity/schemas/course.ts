import { defineType, defineField } from "sanity";

export const course = defineType({
  name: "course",
  title: "Course",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "localizedString",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedText",
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "localizedString" }],
    }),
    defineField({
      name: "isPopular",
      title: "Is Most Popular?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title.en", popular: "isPopular" },
    prepare({ title, popular }) {
      return {
        title: title || "Untitled Course",
        subtitle: popular ? "Most Popular" : "",
      };
    },
  },
});
