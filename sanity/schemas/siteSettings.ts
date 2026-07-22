import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp Number",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "instagram",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "youtube",
      title: "YouTube URL",
      type: "url",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "localizedString",
    }),
    defineField({
      name: "heroSubheadline",
      title: "Hero Subheadline",
      type: "localizedString",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "localizedText",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image (Teacher Photo)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "trustStats",
      title: "Trust Strip Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "localizedString" },
            { name: "value", title: "Value", type: "string" },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
