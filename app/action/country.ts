import { handleFetchResponse } from "@/lib/helper";
import { Country, Error as ResponseError } from "@/types";

export const getCountries = async (): Promise<Country[] | undefined> => {
  try {
    const response = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag",{
        cache: "no-cache",
      }
    );

    const countries = (await response.json()) as Country[];
    return countries;
  } catch (e) {
    const customError = e as ResponseError;
    throw new Error(customError.message);
  }
};
