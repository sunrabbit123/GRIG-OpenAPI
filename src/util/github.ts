import { RequestObject, sendRequest } from "./parser";
import { UserDTO } from "../DTO";
import { AxiosResponse } from "axios";

const getUserApiUrl: Function = (nickname: string): string => {
  return `https://api.github.com/users/${nickname}`;
};
export const getUserByNickName: Function = async (
  nickname: string
): Promise<UserDTO.UserInform> => {
  const body: RequestObject = {
    url: getUserApiUrl(nickname),
    method: "GET",
    data: {},
  };
  const userData: AxiosResponse = await sendRequest(body);
  return userData.data;
};
