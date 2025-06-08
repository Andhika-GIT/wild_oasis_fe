import * as z from "zod";

export const updateNationalitySchema = z.object({
  national_id: z.string().min(1, "national ID field is required"),
  nationality: z.string().min(1, "nationality is required"),
  country_flag: z.string().min(1, "country flag is required"),

});

export type updateNationalitySchemaType = z.infer<typeof updateNationalitySchema>;