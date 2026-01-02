import { z } from "zod";

export const courseLevels = ["Beginner", "Intermediate", "Advanced"] as const;
export const courseStatus = ["Draft", "Published", "Archived"] as const;

//? coerce: auto convert price from string to number, since frontend price will passing as a string.
export const courseSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long." })
    .max(100, { message: "Title must be at most 100 characters long." }),

  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long." }),

  fileKey: z.string().min(1, { message: "Course file is required." }),

  price: z.coerce
    .number()
    .refine((val) => !isNaN(val), {
      message: "Price must be a number."
    })
    .min(1, { message: "Price must be at least 1." }),

  duration: z.coerce
    .number()
    .refine((val) => !isNaN(val), {
      message: "Duration must be a number."
    })
    .min(1, { message: "Duration is required." })
    .max(500, { message: "Duration cannot exceed 500 minutes (5 hours)." }), //! 500 === 5hrs

  level: z.enum(courseLevels).refine((val) => courseLevels.includes(val), {
    message: "Please select a valid course level."
  }),

  category: z.string().min(1, { message: "Category is required." }),

  smallDescription: z
    .string()
    .min(3, {
      message: "Short description must be at least 3 characters long."
    })
    .max(200, {
      message: "Short description must be at most 200 characters long."
    }),

  slug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters long." }),

  status: z.enum(courseStatus).refine((val) => courseStatus.includes(val), {
    message: "Please select a valid course status."
  })
});
