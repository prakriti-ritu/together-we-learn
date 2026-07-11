import { defineType, defineField } from "sanity";

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Gallery Image",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "localizedString",
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
    select: { title: "caption.en", media: "image" },
    prepare({ title, media }) {
      return { title: title || "Gallery Image", media };
    },
  },
});
