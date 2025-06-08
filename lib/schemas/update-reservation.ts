import * as z from "zod";

export const updateReservationSchema = z.object({
  num_guests: z.number().min(1, "guest number field is required"),
  observations: z.string().min(1, "observations field is required"),
});

export type updateReservationSchemaType = z.infer<
  typeof updateReservationSchema
>;
