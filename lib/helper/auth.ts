import { jwtVerify } from "jose";

export const getJwtSecretKey = () => {
  const secret_key = process.env.JWT_SECRET_KEY;
  if (!secret_key || secret_key.length === 0) {
    throw new Error("The environment variable JWT_SECRET_KEY is not set");
  }
  return secret_key;
};

export const verifyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()));
    return verified;
  } catch (error) {
    // Type assertion to recognize 'code' property
    if ((error as any).code === "ERR_JWT_EXPIRED") {
      return null;
    }
    throw error;
  }
};