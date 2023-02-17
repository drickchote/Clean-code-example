import { ServerError } from "../errors";

export const badRequest = (error: Error) => ({
  statusCode: 400,
  body: error,
});

export const serverError = () => ({
  statusCode: 500,
  body: new ServerError(),
});

export const ok = (data: any) => ({
  statusCode: 200,
  body: data,
});
