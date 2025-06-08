"use client";

import { updateCurrentUserBooking } from "@/app/action/booking/client";
import { Button } from "@/components/ui";
import {
  updateReservationSchemaType,
  updateReservationSchema,
} from "@/lib/schemas/update-reservation";
import { Booking } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ApiError } from "next/dist/server/api-utils";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type EditReservationForm = {
  booking: Booking;
  bookingId: string;
};

const EditReservationForm: React.FC<EditReservationForm> = ({
  booking,
  bookingId,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // form state
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<updateReservationSchemaType>({
    resolver: zodResolver(updateReservationSchema),
    defaultValues: {
      num_guests: booking?.num_guests || 0,
      observations: booking?.observations || "",
    },
  });

  // update form mutation
  const { mutate } = useMutation({
    mutationFn: (formData: updateReservationSchemaType) => {
      console.log(formData);
      setErrorMessage(null);
      return updateCurrentUserBooking(parseInt(bookingId), formData);
    },
    onSuccess: () => {
      toast.success("Succesfully update booking")
    },
    onError: (error: ApiError) => {
      setErrorMessage(error.message);
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => mutate(data))}
      //   action={updateBooking}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <input type="hidden" value={bookingId} name="bookingId" />

      <div className="space-y-2">
        <label htmlFor="num_guests">How many guests?</label>
        <select
          {...register("num_guests", {
            setValueAs: (v) => parseInt(v),
          })}
          name="num_guests"
          id="num_guests"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        >
          <option value="" key="">
            Select number of guests...
          </option>
          {Array.from(
            { length: booking.cabin.max_capacity },
            (_, i) => i + 1
          ).map((x) => (
            <option value={x} key={x}>
              {x} {x === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
        {errors.num_guests && (
          <p className="text-red-500">{errors.num_guests.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="observations">
          Anything we should know about your stay?
        </label>
        <textarea
          {...register("observations")}
          name="observations"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
        {errors.observations && (
          <p className="text-red-500">{errors.observations.message}</p>
        )}
      </div>

      {/* error message */}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <div className="flex justify-end items-center gap-6">
        <Button
          variant="link"
          className="hover:text-accent-400 transition-colors p-4 bg-stone-900"
        >
          Update reservation
        </Button>
      </div>
    </form>
  );
};

export default EditReservationForm;
