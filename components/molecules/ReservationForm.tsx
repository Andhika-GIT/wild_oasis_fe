"use client";

import {
  createReservationSchema,
  createReservationSchemaType,
} from "@/lib/schemas/create-reservation";
import { useReservation } from "@/store";
import { Cabin, CreateBooking } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInDays } from "date-fns";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { Error as ApiError } from "@/types";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createBooking } from "@/app/action/booking/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ReservationFormProps = {
  cabin: Cabin;
};

export const ReservationForm: NextPage<ReservationFormProps> = ({ cabin }) => {
  // CHANGE
  const { range } = useReservation();
  const router = useRouter();

  const [credentialErrorMessage, setCredentialErrorMessage] = useState<
    string | null
  >(null);
  const { max_capacity } = cabin;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createReservationSchemaType>({
    resolver: zodResolver(createReservationSchema),
  });

  const { mutate } = useMutation({
    mutationFn: (formData: createReservationSchemaType) => {
      setCredentialErrorMessage(null);

      const bookingData: CreateBooking = {
        start_date: range?.from,
        end_date: range?.to,
        num_nights: differenceInDays(range?.to || "", range?.from || ""),
        num_guests: formData.num_guests,
        cabin_price:
          differenceInDays(range?.to || "", range?.from || "") *
          (cabin.regular_price - cabin.discount),
        extras_price: 0,
        total_price:
          differenceInDays(range?.to || "", range?.from || "") *
          (cabin.regular_price - cabin.discount),
        status: "unconfirmed",
        has_breakfast: false,
        is_paid: false,
        observations: formData.observations.slice(0, 1000),
        cabin_id: cabin.id,
      };
      return createBooking(bookingData);
    },
    onSuccess: () => {
      toast.success("Sucessfully create booking");
    },
    onError: (error: ApiError) => {
      if (error.code === 401) {
        toast.warning("please sign in first");
        return router.push('/login')
      }
      setCredentialErrorMessage(error.message);
    },
  });

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        {/* <p>Logged in as</p> */}

        {/* <div className='flex gap-4 items-center'>
            <img
              // Important to display google profile images
              referrerPolicy='no-referrer'
              className='h-8 rounded-full'
              src={user.image}
              alt={user.name}
            />
            <p>{user.name}</p>
          </div> */}
      </div>

      <form
        onSubmit={handleSubmit((formData) => mutate(formData))}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        {credentialErrorMessage && (
          <p className="text-red-600 text-sm mt-2 text-center">
            {credentialErrorMessage}
          </p>
        )}
        <div className="space-y-2">
          <label htmlFor="num_guests">How many guests?</label>
          <select
            id="num_guests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
            {...register("num_guests", {
              setValueAs: (v) => parseInt(v),
            })}
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: max_capacity }, (_, i) => i + 1).map((x) => (
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
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
            {...register("observations")}
          />
          {errors.observations && (
            <p className="text-red-500">{errors.observations.message}</p>
          )}
        </div>

        <div className="flex justify-end items-center gap-6">
          <p className="text-primary-300 text-base">Start by selecting dates</p>

          <button
            type="submit"
            className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
          >
            Reserve now
          </button>
        </div>
      </form>
    </div>
  );
};
