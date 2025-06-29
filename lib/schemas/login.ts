import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "email is required").email("invalid email format"),
  password: z.string().min(1, "password is required"),
});

export type loginSchemaType = z.infer<typeof loginSchema>;