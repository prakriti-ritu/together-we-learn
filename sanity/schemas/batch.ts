import { defineType, defineField } from "sanity";

export const batch = defineType({
  name: "batch",
  title: "Batch",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Batch name / level",
      description:
        'e.g. "Beginner Spoken English — Morning Batch" or "Intermediate Batch"',
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      description:
        "Upcoming = starting soon (shows start date). Running now = currently ongoing. Closed = hidden from the site.",
      type: "string",
      options: {
        list: [
          { title: "Upcoming", value: "upcoming" },
          { title: "Running now", value: "running" },
          { title: "Closed (hidden)", value: "closed" },
        ],
        layout: "radio",
      },
      initialValue: "upcoming",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "startDate",
      title: "Start date",
      description: "When the batch begins. Shown as 'Starts 5 Aug' + a countdown.",
      type: "date",
      options: { dateFormat: "DD MMM YYYY" },
    }),
    defineField({
      name: "schedule",
      title: "Days & timing",
      description: 'e.g. "Mon–Fri, 7:00–8:00 AM"',
      type: "localizedString",
    }),
    defineField({
      name: "seatsTag",
      title: "Seats tag (optional)",
      description: 'Optional urgency label, e.g. "Filling fast" / "Few seats left". No numbers needed.',
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
      title: "Start date",
      name: "startDateAsc",
      by: [{ field: "startDate", direction: "asc" }],
    },
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title.en", status: "status", startDate: "startDate" },
    prepare({ title, status, startDate }) {
      const statusLabel =
        status === "running"
          ? "Running now"
          : status === "closed"
            ? "Closed"
            : "Upcoming";
      return {
        title: title || "Untitled Batch",
        subtitle: [statusLabel, startDate].filter(Boolean).join(" · "),
      };
    },
  },
});
