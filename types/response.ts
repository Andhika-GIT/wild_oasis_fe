export type Error = {
  code: number;
  message: string;
};

export type Success<T> = {
  code: number;
  message: string;
  data?: T;
};

export type ApiResponse<T> = Error | Success<T>;
