import axios, { AxiosRequestConfig } from 'axios';
export default async function fetchJson(config: AxiosRequestConfig) {
  const response = await axios(config);

  console.log(response)

  if (response.status >= 200 && response.status <= 205) {
    return response.data;
  }

  throw new FetchError({
    message: response.data.name,
    response,
    data: response.data,
  });
}

interface IProps {
  message: string;
  response: any;
  data: any;
}


export class FetchError extends Error {
  response;
  data;
  constructor({ message, response, data }: IProps) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(message);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }

    this.name = "FetchError";
    this.response = response;
    this.data = data ?? { message: message };
  }
}
