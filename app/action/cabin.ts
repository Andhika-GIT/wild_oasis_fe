import { SERVER_BASE_URL, handleFetchResponse } from "@/lib/helper";
import { Cabin, Error as ResponseError } from "@/types";
import { notFound } from "next/navigation";

export const getAllCabin = async (): Promise<Cabin[] | undefined> => {
  try {
    const response = await fetch(`${SERVER_BASE_URL}/cabins`, {
      cache: "no-cache",
    });

    return await handleFetchResponse<Cabin[]>(response);
  } catch (e) {}
};

export const getCabinById = async (id: string): Promise<Cabin | undefined> => {
  try {
    const response = await fetch(`${SERVER_BASE_URL}/cabins/${id}`);

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
