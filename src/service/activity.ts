import { GithubAPI } from "../util";

export const getActivityByUser: Function = async (nickname: string) => {
  const user = await GithubAPI.getActivityByUser(nickname);
  return {
    contributions:
      user.contributionsCollection.totalCommitContributions +
      user.contributionsCollection.restrictedContributionsCount,
    pullRequests: user.pullRequests.totalCount,
    issues: user.issues.totalCount,
    repositoriesContributedTo: user.repositoriesContributedTo.totalCount,
    publicRepositories: user.repositories.totalCount,
    repositoriesInform: user.repositories.nodes,
  };
};
