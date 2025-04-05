import { SERVER_BASE_URL, handleFetchResponse } from "@/lib/helper";
import { Cabin, Error as ResponseError } from "@/types";
import { AuthSignInRequestBody } from "@/types";

export const signIn = async ( signInBody : AuthSignInRequestBody): Promise<string | undefined> => {
  const BASE_URL = `${SERVER_BASE_URL}/auth/sign-in`;

  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(signInBody),
    });

    return await handleFetchResponse<string>(response);
  } catch (e) {
    const customError = e as ResponseError;
    throw new Error(customError.message);
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