import { GithubAPI } from "../util";

export const getUser: Function = async (nickname: string) => {
  const data = await GithubAPI.getUserByNickName(nickname);
  return Object.assign({ nickname: data.login }, data);
};
 