import { ApiResponse, Error, Success } from "@/types";

export const handleFetchResponse = async <T>(
  response: Response
): Promise<T> => {
  const result: ApiResponse<T> = await response.json();

  if (!response.ok) {
    const error: Error = {
      code: result.code || response.status,
      message: result.message || "Something went wrong",
    };
    throw error;
  }

  const success = result as Success<T>;
  return success.data as T;
};
