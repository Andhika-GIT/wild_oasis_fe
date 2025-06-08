"use client";

import React, { useTransition } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { deleteCurrentUserBookings } from "@/app/action/booking";
import { LoadingSpinner } from "../ui";
import { ApiError } from "next/dist/server/api-utils";
import { toast } from "sonner";

export type DeleteReservationProps = {
  bookingId: number;
};

export const DeleteReservation: React.FC<DeleteReservationProps> = ({
  bookingId,
}) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        deleteCurrentUserBookings(bookingId);
        toast.success("Succesfully delete booking")
      } catch (error) {
        toast.error(error as string);
      }
    });
  };

  return (
    <button
      disabled={isPending}
      onClick={handleDelete}
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
    >
      {!isPending ? (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      ) : (
        <span className="mx-auto">
          <LoadingSpinner />
        </span>
      )}
    </button>
  );
};

export default DeleteReservation;
