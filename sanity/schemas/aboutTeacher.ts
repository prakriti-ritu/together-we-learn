import { defineType, defineField } from "sanity";

export const aboutTeacher = defineType({
  name: "aboutTeacher",
  title: "About Teacher",
  type: "document",
  fields: [
    defineField({
      name: "photo",
      title: "Teacher Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "localizedText",
    }),
    defineField({
      name: "credentials",
      title: "Credentials",
      type: "array",
      of: [{ type: "localizedString" }],
    }),
  ],
  preview: {
    prepare() {
      return { title: "About Teacher" };
    },
  },
});
