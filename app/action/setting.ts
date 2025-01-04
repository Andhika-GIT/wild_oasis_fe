import { SERVER_BASE_URL, handleFetchResponse } from "@/lib/helper";
import { Setting, Error as ResponseError } from "@/types";
import { notFound } from "next/navigation";

export const getSetting = async (): Promise<Setting | undefined> => {
  try {
    const response = await fetch(`${SERVER_BASE_URL}/setting`);

    return await handleFetchResponse<Setting>(response);
  } catch (e) {
    const customError = e as ResponseError;
    throw new Error(customError.message);
  }
};
