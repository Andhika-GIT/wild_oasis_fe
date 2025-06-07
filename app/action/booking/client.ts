"use client";

import { SERVER_BASE_URL, handleFetchResponse } from "@/lib/helper";
import { CreateBooking, Error as ResponseError } from "@/types";
import { notFound } from "next/navigation";
import { updateReservationSchemaType } from "@/lib/schemas/update-reservation";

export const updateCurrentUserBooking = async (
  id: number,
  formData: updateReservationSchemaType
): Promise<String | undefined> => {
  try {
    const response = await fetch(`${SERVER_BASE_URL}/booking/me/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    return await handleFetchResponse<String>(response);
  } catch (e) {
    const customError = e as ResponseError;
    if (customError.code === 404) {
      notFound();
    } else {
      throw new Error(customError.message);
    }
  }
};

export const createBooking = async (
  bookingData: CreateBooking
): Promise<String | undefined> => {
  try {
    const response = await fetch(`${SERVER_BASE_URL}/booking/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
      credentials: "include",
    });

    return await handleFetchResponse<String>(response);
  } catch (e) {
    const customError = e as ResponseError;
      throw new Error(customError.message);
  }
};
