"use server"

import { SERVER_BASE_URL, handleFetchResponse } from "@/lib/helper";
import { BookedDates, Booking, Error as ResponseError } from "@/types";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const getBookedDatesByCabinId = async (
  id: number | undefined
): Promise<BookedDates | undefined> => {
  try {
    const response = await fetch(
      `${SERVER_BASE_URL}/booking/booked-dates/cabin/${id}`
    );

    return await handleFetchResponse<BookedDates>(response);
  } catch (e) {
    const customError = e as ResponseError;
    if (customError.code === 404) {
      notFound();
    } else {
      throw new Error(customError.message);
    }
  }
};

export const getCurrentUserBookings = async (): Promise<
  Booking[] | undefined
> => {
  try {
    const response = await fetch(`${SERVER_BASE_URL}/booking/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
    });

    return await handleFetchResponse<Booking[]>(response);
  } catch (e) {
    const customError = e as ResponseError;
    if (customError.code === 404) {
      notFound();
    } else {
      throw new Error(customError.message);
    }
  }
};


export const deleteCurrentUserBookings = async (id: string): Promise<
  string | undefined
> => {
  try {
    console.log(SERVER_BASE_URL)
    const response = await fetch(`${SERVER_BASE_URL}/booking/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
    });

    await handleFetchResponse<string>(response);
    revalidatePath("/account/reservations")
    return
  } catch (e) {
    const customError = e as ResponseError;
    if (customError.code === 404) {
      notFound();
    } else {
      throw new Error(customError.message);
    }
  }
};
