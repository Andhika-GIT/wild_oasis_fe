"use client";

import { Button } from "@/components/ui";
import { Booking } from "@/types";
import React from "react";

type EditReservationForm = {
  booking: Booking | undefined;
  bookingId: string;
};

const EditReservationForm: React.FC<EditReservationForm> = ({
  booking,
  bookingId,
}) => {
  return (
    <form
      //   action={updateBooking}
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
    >
      <input type="hidden" value={bookingId} name="bookingId" />

      <div className="space-y-2">
        <label htmlFor="numGuests">How many guests?</label>
        <select
          name="numGuests"
          id="numGuests"
          defaultValue={booking.num_guests}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          required
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
      </div>

      <div className="space-y-2">
        <label htmlFor="observations">
          Anything we should know about your stay?
        </label>
        <textarea
          name="observations"
          defaultValue={booking.observations}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <Button>Update reservation</Button>
      </div>
    </form>
  );
};

export default EditReservationForm;
