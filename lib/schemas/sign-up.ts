import * as z from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "username is required"),
  email: z.string().min(1, "email is required"),
  password: z.string().min(1, "password is required"),
});

export type loginSchemaType = z.infer<typeof loginSchema>;