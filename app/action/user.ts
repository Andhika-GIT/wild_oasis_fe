
import { SERVER_BASE_URL, handleFetchResponse } from "@/lib/helper";
import { CurrentUser, Error as ResponseError } from "@/types";
import { cookies } from "next/headers";



export const getCurrentUser = async () : Promise<CurrentUser | undefined> => {
    const BASE_URL = `${SERVER_BASE_URL}/auth/me`;
  
    try {
      const response = await fetch(BASE_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
           Cookie: cookies().toString() 
        },

        })
  
      return await handleFetchResponse(response)
    } catch(e) {
      throw e as ResponseError
    }
  }