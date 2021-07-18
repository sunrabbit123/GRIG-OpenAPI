import { GithubAPI } from "../util";

export const getUser: Function = async (nickname: string) => {
  return await GithubAPI.getUserByNickName(nickname);
};
