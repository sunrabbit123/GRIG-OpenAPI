import { RequestObject, sendRequest } from "./parser";
import { UserDTO } from "../DTO";
import { AxiosResponse } from "axios";

export const getUserApiUrl: Function = (nickname: string): string => {
  return `https://api.github.com/users/${nickname}`;
};

export const getUserByTokenUrl: string = "https://api.github.com/user";
export const getAccessTokenByCodeUrl: string =
  "https://github.com/login/oauth/access_token";

const getGraphQLApi: Function = (variables: Object) => {
  const query = {
    query: `
    query userInfo($login: String!) {
      user(login: $login) {
        contributionsCollection {
          restrictedContributionsCount
          contributionCalendar{
            totalContributions
        }
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
        followers{
          totalCount
        }
        following{
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

export const getUserByToken: Function = async (
  token: string
): Promise<{ name: string; nickname: string }> => {
  const header: Object = {
    Accept: "application/vnd.github.cloak-preview+json",
    Authorization: `token ${token}`,
  };
  const body: RequestObject = {
    url: getUserByTokenUrl,
    method: "GET",
    data: {},
    header: header,
  };
  const userData: AxiosResponse = await sendRequest(body);
  const { name, login } = userData.data;
  return { name: name, nickname: login };
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

export const getAccessTokenByCode: Function = async (
  code: string
): Promise<Object> => {
  const header = {
    Accept: "application/json",
  };
  const data = {
    client_id: process.env.client_id,
    client_secret: process.env.client_secret,
    code: code,
    redirect_uri: process.env.redirect_uri,
  };
  const body: RequestObject = {
    url: getAccessTokenByCodeUrl,
    method: "POST",
    data: data,
    header: header,
  };
  const result: AxiosResponse = await sendRequest(body);
  return result.data;
};
