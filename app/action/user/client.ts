"use client";

import { handleFetchResponse, SERVER_BASE_URL } from "@/lib/helper";
import { Error } from "@/types";
import { Error as ResponseError } from "@/types";
import { updateNationalitySchemaType } from "@/lib/schemas/update-nationality";

export const UpdateCurrentUserNationality = async (
  formData: updateNationalitySchemaType
): Promise<string | undefined> => {
  const BASE_URL = `${SERVER_BASE_URL}/auth/update-nationality`;

  try {
    const response = await fetch(BASE_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    return await handleFetchResponse(response);
  } catch (e) {
    throw e as Error;
  }
};

export const signOutUser = async (): Promise<String | undefined> => {
  const BASE_URL = `${SERVER_BASE_URL}/auth/sign-out`;

  try {
    const response = await fetch(BASE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    return await handleFetchResponse(response);
  } catch (e) {
    throw e as ResponseError;
  }
};
