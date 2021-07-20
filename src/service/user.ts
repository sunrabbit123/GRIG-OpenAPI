import { GithubAPI } from "../util";

export const getUser: Function = async (nickname: string) => {
  const data = await GithubAPI.getUserByNickName(nickname);
  return Object.assign({ nickname: data.login }, data);
};

export const getCommitCount: Function = async (nickname: string) => {
  const user = await GithubAPI.getCommitsByUser(nickname);
  return (
    user.contributionsCollection.totalCommitContributions +
    user.contributionsCollection.restrictedContributionsCount
  );
};
