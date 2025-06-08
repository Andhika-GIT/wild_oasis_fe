"use client";

import { useState } from "react";
import { BookedDates, Cabin, Setting } from "@/types";
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "@/store";

type DateSelectorProps = {
  cabin: Cabin;
  setting: Setting | undefined;
  bookedDates: BookedDates;
};

function isAlreadyBooked(range: any, datesArr: BookedDates) {
  return (
    range.from &&
    range.to &&
    datesArr?.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

export const DateSelector: React.FC<DateSelectorProps> = ({
  cabin,
  setting,
  bookedDates,
}) => {
  const { range, setRange, resetRange } = useReservation((state) => state);

  const displayRange = isAlreadyBooked(range, bookedDates)
    ? {
        from: undefined,
        to: undefined,
      }
    : range;

  const { regular_price, discount } = cabin;
  const numNights = differenceInDays(
    displayRange?.to || "",
    displayRange?.from || ""
  );
  const cabinPrice = numNights * (regular_price - discount);

  // SETTINGS
  const minBookingLength = setting?.min_booking_length || 1;
  const maxBookingLength = setting?.max_booking_length || 23;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        onSelect={setRange}
        selected={displayRange}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(currentDate) =>
          isPast(currentDate) ||
          bookedDates?.some((date) => isSameDay(date, currentDate))
        }
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regular_price - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regular_price}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regular_price}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
};
