"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { z } from "zod";
import { revalidatePath } from "next/cache";

function isInvalid(text) {
  return !text || text.trim() === "";
}

const schema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(1, { message: "Title is required" }),
  summary: z
    .string({
      required_error: "Summary is required",
    })
    .min(1, { message: "Summary is required" }),
  instructions: z
    .string({
      required_error: "Instruction is required",
    })
    .min(1, { message: "Instruction is required" }),
  creator: z
    .string({
      required_error: "Your name is required",
    })
    .min(1, { message: "Your name is required" }),
  creator_email: z.string().min(1, { message: "Email is required" }).email({
    message: "Invalid email",
  }),
  image: z
    .object({
      size: z.number(),
      type: z.string(),
      name: z.string(),
    })
    .refine(
      (file) => {
        const supportedTypes = ["image/jpeg", "image/png"];
        const supportedExtensions = ["jpeg", "png", "jpg"];
        // Check if file MIME type is supported
        if (!supportedTypes.includes(file.type)) {
          return false;
        }
        // Check if file extension is supported
        const fileExtension = file.name.split(".").pop().toLowerCase();
        if (!supportedExtensions.includes(fileExtension)) {
          return false;
        }
        // All checks passed, file is a valid image
        return true;
      },
      {
        message: "Invalid image file",
      }
    ),
});

export async function shareMeal(prevState, formData) {
  const validatedFields = schema.safeParse({
    title: formData.get("title"),
    summary: formData.get("summary"),
    image: formData.get("image"),
    instructions: formData.get("instructions"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    image: formData.get("image"),
    instructions: formData.get("instructions"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  await saveMeal(meal);

  revalidatePath("/meals");
  redirect("/meals");
}
