export type RankingSortCriteriaType = {
  [key: string]: Object;
  contributions: Object;
  pullRequests: Object;
  issues: Object;
  repositoriesContributedTo: Object;
  publicRepositories: Object;
  stared: Object;
  forked: Object;
  followers: Object;
  following: Object;
};

export const RankingSortCriteria: RankingSortCriteriaType = {
  contributions: { contributions: -1 },
  pullRequests: { pullRequests: -1 },
  issues: { issues: -1 },
  repositoriesContributedTo: { repositoriesContributedTo: -1 },
  publicRepositories: { publicRepositories: -1 },
  stared: { stared: -1 },
  forked: { forked: -1 },
  followers: { followers: -1 },
  following: { following: -1 },
};

export interface GetRankingInput {
  count: number;
  page: number;
  criteria: string;
}
