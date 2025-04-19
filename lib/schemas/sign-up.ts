import * as z from "zod";

export const signUpSchema = z.object({
  username: z.string().min(1, "username is required"),
  email: z.string().min(1, "email is required").email("invalid email format"),
  password: z.string().min(1, "password is required"),
});

export type signUpSchemaType = z.infer<typeof signUpSchema>;