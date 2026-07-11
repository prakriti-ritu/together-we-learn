import { defineType, defineField } from "sanity";

export const review = defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({
      name: "studentName",
      title: "Student Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
    }),
    defineField({
      name: "rating",
      title: "Rating (1-5)",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: "reviewText",
      title: "Review Text",
      type: "localizedText",
    }),
    defineField({
      name: "photo",
      title: "Student Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
    }),
  ],
  preview: {
    select: { title: "studentName", subtitle: "city", rating: "rating" },
    prepare({ title, subtitle, rating }) {
      return {
        title: title || "Anonymous",
        subtitle: `${subtitle || ""} - ${"★".repeat(rating || 0)}`,
      };
    },
  },
});
