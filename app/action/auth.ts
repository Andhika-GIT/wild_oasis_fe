"use client"

import { SERVER_BASE_URL, handleFetchResponse } from "@/lib/helper";
import { loginSchemaType } from "@/lib/schemas/login";
import { signUpSchemaType } from "@/lib/schemas/sign-up";
import { ApiResponse, Cabin, Error as ResponseError } from "@/types";


export const signIn = async (
  formData: loginSchemaType
): Promise<string | undefined> => {
  const BASE_URL = `${SERVER_BASE_URL}/auth/sign-in`;

  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    return await handleFetchResponse<string>(response);

  } catch (e) {
    const customError = e as ResponseError;
    throw customError
  }
};

export const signUp = async (
  formData: signUpSchemaType
): Promise<string | undefined> => {
  const BASE_URL = `${SERVER_BASE_URL}/auth/sign-up`;

  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    return await handleFetchResponse<string>(response);

  } catch (e) {
    const customError = e as ResponseError;
    throw customError
  }
};

