import { SERVER_BASE_URL, handleFetchResponse } from "@/lib/helper";
import { Cabin, Error as ResponseError } from "@/types";
import { notFound } from "next/navigation";
import { CabinCapacityFilter } from "@/types";

export const getAllCabin = async ({
  maxCapacityFilter,
}: CabinCapacityFilter): Promise<Cabin[] | undefined> => {
  const BASE_URL = maxCapacityFilter
    ? `${SERVER_BASE_URL}/cabins?max_capacity=${maxCapacityFilter}`
    : `${SERVER_BASE_URL}/cabins`;

  try {
    const response = await fetch(BASE_URL, {
      cache: "no-cache",
    });

    return await handleFetchResponse<Cabin[]>(response);
  } catch (e) {
    const customError = e as ResponseError;
    throw new Error(customError.message);
  }
};

export const getCabinById = async (id: string): Promise<Cabin | undefined> => {
  try {
    const response = await fetch(`${SERVER_BASE_URL}/cabins/${id}`, {
      cache: 'no-cache'
    });
    

    return await handleFetchResponse<Cabin>(response);
  } catch (e) {
    const customError = e as ResponseError;
    if (customError.code === 404) {
      notFound();
    } else {
      throw new Error(customError.message);
    }
  }
};
