import { z } from "zod";
import { courseCategories, courseLevels, courseStatus } from "../constant/adminPage";

//? coerce: auto convert price from string to number, since frontend price will passing as a string.
export const courseSchema = z.object({
  title: z
    .string()
    .nonempty({ message: "title is required!" })
    .min(3, { message: "Title must be at least 3 characters long." })
    .max(100, { message: "Title must be at most 100 characters long." }),

  description: z
    .string()
    .nonempty({ message: "description is required!" })
    .min(3, { message: "Description must be at least 3 characters long." }),

  fileKey: z
    .string()
    .nonempty({ message: "fileKey is required!" })
    .min(1, { message: "Course file is required." }),
  price: z.coerce
    .number()
    .min(1, { message: "Price must be a positive number." }),

  duration: z.coerce
    .number()
    .min(1, { message: "Duration is required." })
    .max(500, { message: "Duration cannot exceed 500 hours." }),

  level: z
    .enum(courseLevels, { message: "Level is required!" })
    .refine((val) => courseLevels.includes(val), {
      message: "Please select a valid course level."
    }),

  category: z
    .enum(courseCategories, {
      message: "category is required!"
    })
    .refine((val) => courseCategories.includes(val), {
      message: "Please select a valid course category."
    }),

  smallDescription: z
    .string()
    .nonempty({ message: "Small description is required!" })
    .min(3, {
      message: "Short description must be at least 3 characters long."
    })
    .max(200, {
      message: "Short description must be at most 200 characters long."
    }),

  slug: z
    .string()
    .nonempty({ message: "Slug is required!" })
    .min(3, { message: "Slug must be at least 3 characters long." }),

  status: z
    .enum(courseStatus, { message: "Status is required!" })
    .refine((val) => courseStatus.includes(val), {
      message: "Please select a valid course status."
    })
});

export type CourseSchemaType = z.infer<typeof courseSchema>;
