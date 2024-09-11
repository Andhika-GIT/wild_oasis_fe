import { SERVER_BASE_URL, handleFetchResponse } from "@/lib/helper";
import { Cabin } from "@/types";

export const getAllCabin = async (): Promise<Cabin[] | undefined> => {
  try {
    const response = await fetch(`${SERVER_BASE_URL}/cabins`, {
      cache: "no-cache",
    });

    return await handleFetchResponse<Cabin[]>(response);
  } catch (e) {}
};
