import axios, { AxiosResponse, Method } from "axios";

export interface RequestObject {
  url: string;
  data: unknown;
  method: Method;
}

export const sendRequest: Function = async (
  arg: RequestObject
): Promise<AxiosResponse<any>> => {
  const res = await axios({
    method: arg.method,
    url: arg.url,
    data: arg.data,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};
