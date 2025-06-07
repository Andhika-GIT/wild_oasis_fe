import * as z from "zod";

export const createReservationSchema = z.object({
  num_guests: z.number().min(1, "guest number field is required"),
  observations: z.string().min(1, "observations field is required"),
});

export type createReservationSchemaType = z.infer<
  typeof createReservationSchema
>;
