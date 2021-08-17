import * as mongoose from "mongoose";

import { CodeModel } from "../src/model/code";
import { UserModel } from "../src/model/users";
import { UserDTO } from "../src/DTO";
import { GithubAPI } from "../src/util";
import internal from "stream";

export interface CreateUserInterface {
  access_token: string;
  name: string;
  nickname: string;
  generation: number;
}

export const createUser: Function = async (data: CreateUserInterface) => {
  mongoose
    .connect(process.env.MongoDBUrl ?? "", {
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then((): void => console.log("MongoDB connected"))
    .catch((err: Error): void =>
      console.log("Failed to connect MongoDB: ", err)
    );
  const result = await new UserModel(data).save();
  return result;
};

export const deleteUserByNickname: Function = async (nickname: string) => {
  mongoose
    .connect(process.env.MongoDBUrl ?? "", {
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then((): void => console.log("MongoDB connected"))
    .catch((err: Error): void =>
      console.log("Failed to connect MongoDB: ", err)
    );
  const result = await UserModel.findOneAndDelete({ nickname: nickname });
  return result;
};

export const createToken: Function = async (data: {
  email: string;
  nickname: string;
}) => {
  mongoose
    .connect(process.env.MongoDBUrl ?? "", {
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then((): void => console.log("MongoDB connected"))
    .catch((err: Error): void =>
      console.log("Failed to connect MongoDB: ", err)
    );
  const result = await new CodeModel(data).save();
  return result;
};

interface RepositoriesNode {
  forkCount: number;
  stargazers: { totalCount: number };
}
export const updateUserInformation: Function = async (nickname: string) => {
  mongoose
    .connect(process.env.MongoDBUrl ?? "", {
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then((): void => console.log("MongoDB connected"))
    .catch((err: Error): void =>
      console.log("Failed to connect MongoDB: ", err)
    );
  const user = await UserModel.findOne({ nickname: nickname });

  const userInform = await GithubAPI.getActivityByUser(nickname);
  const repositories = userInform.repositories.nodes;

  const userData: UserDTO.UserUpdateInput = {
    contributions:
      userInform.contributionsCollection.contributionCalendar
        .totalContributions +
      userInform.contributionsCollection.restrictedContributionsCount,
    pullRequests: userInform.pullRequests.totalCount,
    issues: userInform.issues.totalCount,
    repositoriesContributedTo: userInform.repositoriesContributedTo.totalCount,
    publicRepositories: userInform.repositories.totalCount,
    stared: repositories.reduce(
      (acc: number, cur: RepositoriesNode, _: number) => {
        return acc + cur.stargazers.totalCount;
      },
      0
    ),
    forked: repositories.reduce(
      (acc: number, cur: RepositoriesNode, _: number) => {
        return acc + cur.forkCount;
      },
      0
    ),
    followers: userInform.followers.totalCount,
    following: userInform.following.totalCount,
  };

  await user.updateActivity(userData);
};
