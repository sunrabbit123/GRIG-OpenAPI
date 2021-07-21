import { RequestObject, sendRequest } from "./parser";
import { UserDTO } from "../DTO";
import { AxiosResponse } from "axios";

const getUserApiUrl: Function = (nickname: string): string => {
  return `https://api.github.com/users/${nickname}`;
};

const getGraphQLApi: Function = (variables: Object) => {
  const query = {
    query: `
    query userInfo($login: String!) {
      user(login: $login) {
        contributionsCollection {
          totalCommitContributions
          restrictedContributionsCount
        }
        repositoriesContributedTo(first: 1, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
          totalCount
        }
        pullRequests(first: 1) {
          totalCount
        }
        issues(first: 1) {
          totalCount
        }
        repositories(first: 100, ownerAffiliations: OWNER, orderBy: {direction: DESC, field: STARGAZERS}) {
          totalCount
          nodes {
            stargazers {
              totalCount
            }
            forkCount
          }
        }
      }
    }
    `,
    variables: variables,
  };
  return [`https://api.github.com/graphql`, query];
};

export const getUserByNickName: Function = async (
  nickname: string
): Promise<UserDTO.UserInform> => {
  const header = {
    "Content-Type": "application/json",
    Authorization: `token ${process.env.githubToken}`,
    Accept: "application/vnd.github.cloak-preview+json",
  };
  const body: RequestObject = {
    url: getUserApiUrl(nickname),
    method: "GET",
    data: {},
    header: header,
  };
  const userData: AxiosResponse = await sendRequest(body);
  return userData.data;
};

export const getActivityByUser: Function = async (
  nickname: string
): Promise<Object> => {
  const [url, query] = getGraphQLApi({ login: nickname });
  const header = {
    "Content-Type": "application/json",
    Authorization: `bearer ${process.env.githubToken}`,
  };
  const body: RequestObject = {
    url: url,
    method: "POST",
    data: query,
    header: header,
  };
  const result: AxiosResponse = await sendRequest(body);
  return result.data.data.user;
};
