import { SERVER_BASE_URL, handleFetchResponse } from "@/lib/helper";
import { BookingDates, Error as ResponseError } from "@/types";
import { notFound } from "next/navigation";

export const getBookedDatesByCabinId = async (
  id: string
): Promise<BookingDates | undefined> => {
  try {
    const response = await fetch(
      `${SERVER_BASE_URL}/booking/booked-dates/cabin/${id}`
    );

    return await handleFetchResponse<BookingDates>(response);
  } catch (e) {
    const customError = e as ResponseError;
    if (customError.code === 404) {
      notFound();
    } else {
      throw new Error(customError.message);
    }
  }
};
