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
      name: "heroClipUrl",
      title: "60-Second Class Clip (YouTube URL)",
      description:
        "Optional. A short class clip shown in a band right below the hero. The video loads only when tapped (keeps the page fast).",
      type: "url",
    }),
    defineField({
      name: "achievementImage",
      title: "Achievement Photo (e.g. gold-medal ceremony)",
      description:
        "Optional. A standout achievement photo (e.g. receiving the gold medal, with dignitaries) shown below the hero. Separate from the About Teacher portrait.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "achievementHeading",
      title: "Achievement Heading",
      type: "localizedString",
    }),
    defineField({
      name: "achievementText",
      title: "Achievement Text",
      type: "localizedText",
    }),
    defineField({
      name: "achievementCaption",
      title: "Achievement Photo Caption",
      type: "localizedString",
    }),
    defineField({
      name: "heroStats",
      title: "Hero Stats (count-up numbers)",
      description:
        "Optional big numbers shown under the hero (e.g. Value \"500+\", Label \"Students taught\"). Leave empty to hide the stats band.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", title: "Value (e.g. 500+, 4.9★, 7 yrs)", type: "string" },
            { name: "label", title: "Label", type: "localizedString" },
          ],
        },
      ],
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
    defineField({
      name: "aboutCourseHeading",
      title: "About the Course — Heading",
      type: "localizedString",
    }),
    defineField({
      name: "aboutCourseText",
      title: "About the Course — Description",
      description: "Optional. Overrides the default 'About the Course' paragraph on the homepage.",
      type: "localizedText",
    }),
    defineField({
      name: "whyChooseHeading",
      title: "Why Choose Us — Heading",
      type: "localizedString",
    }),
    defineField({
      name: "whyChoosePoints",
      title: "Why Choose Us — Points",
      description: "Optional. Overrides the default 'Why Choose Us' points. Add up to 5 for best layout.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "localizedString" },
            { name: "description", title: "Description", type: "localizedText" },
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
