import { groq } from "next-sanity";

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  logo,
  phone,
  whatsapp,
  email,
  instagram,
  heroHeadline,
  heroSubheadline,
  heroDescription,
  heroImage,
  trustStats
}`;

export const coursesQuery = groq`*[_type == "course"] | order(order asc){
  _id,
  title,
  duration,
  description,
  features,
  isPopular,
  order
}`;

export const reviewsQuery = groq`*[_type == "review"] | order(date desc){
  _id,
  studentName,
  city,
  rating,
  reviewText,
  photo,
  date
}`;

export const reviewsLimitedQuery = groq`*[_type == "review"] | order(date desc)[0...3]{
  _id,
  studentName,
  city,
  rating,
  reviewText,
  photo,
  date
}`;

export const reviewsCountQuery = groq`count(*[_type == "review"])`;

export const expertSessionsQuery = groq`*[_type == "expertSession"] | order(date desc){
  _id,
  title,
  description,
  date,
  speaker,
  photo,
  videoUrl
}`;

export const expertSessionsLimitedQuery = groq`*[_type == "expertSession"] | order(date desc)[0...3]{
  _id,
  title,
  description,
  date,
  speaker,
  photo,
  videoUrl
}`;

export const expertSessionsCountQuery = groq`count(*[_type == "expertSession"])`;

export const galleryQuery = groq`*[_type == "galleryImage"] | order(order asc)[0...6]{
  _id,
  image,
  caption,
  order
}`;

export const galleryAllQuery = groq`*[_type == "galleryImage"] | order(order asc){
  _id,
  image,
  caption,
  order
}`;

export const classVideosQuery = groq`*[_type == "classVideo"]{
  _id,
  title,
  youtubeUrl,
  thumbnail
}`;

export const aboutTeacherQuery = groq`*[_type == "aboutTeacher"][0]{
  photo,
  bio,
  credentials
}`;

export const faqQuery = groq`*[_type == "faq"] | order(order asc){
  _id,
  question,
  answer,
  order
}`;
