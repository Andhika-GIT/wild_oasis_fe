"use client"

import { SERVER_BASE_URL, handleFetchResponse } from "@/lib/helper";
import { ApiResponse, Cabin, Error as ResponseError } from "@/types";
import { AuthSignInRequestBody } from "@/types";

type SignInResponse = ApiResponse<string>;


export const signIn = async (
  formData: AuthSignInRequestBody
): Promise<SignInResponse> => {
  const BASE_URL = `${SERVER_BASE_URL}/auth/sign-in`;

  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(formData),
    });

    // return await handleFetchResponse<string>(response);
    const result: ApiResponse<string> = await response.json();

    return result
  } catch (e) {
    const customError = e as ResponseError;
    return customError
  }
};

// export const signUp = async ({
//     maxCapacityFilter,
//   }: CabinCapacityFilter): Promise<Cabin[] | undefined> => {
//     const BASE_URL = maxCapacityFilter
//       ? `${SERVER_BASE_URL}/cabins?max_capacity=${maxCapacityFilter}`
//       : `${SERVER_BASE_URL}/cabins`;

//     try {
//       const response = await fetch(BASE_URL, {
//         cache: "no-cache",
//       });

//       return await handleFetchResponse<Cabin[]>(response);
//     } catch (e) {
//       const customError = e as ResponseError;
//       throw new Error(customError.message);
//     }
//   };
