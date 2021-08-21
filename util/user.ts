import * as mongoose from "mongoose";
import { DocumentType } from "@typegoose/typegoose";

import { CodeModel } from "../src/model/code";
import { UserModel, Users } from "../src/model/users";
import { UserDTO } from "../src/DTO";
import { GithubAPI } from "../src/util";

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

export const findUserByNickname: Function = async (
  nickname: string
): Promise<DocumentType<Users> | null> => {
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
  const result = await UserModel.findOne({ nickname: nickname });
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
  console.log(nickname);
  const user = await UserModel.findOne({ nickname: nickname, certified: true });
  if (!user) return;
  console.log("Success get user");
  const userInform = await GithubAPI.getActivityByUser(nickname);
  console.log("Success get user Inform");
  const repositories = userInform.repositories.nodes;

  const userActivityData: UserDTO.UserUpdateActivityInput = {
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
  const userInformData = await GithubAPI.getUserByNickName(nickname);

  const userData = Object.assign({}, userActivityData, userInformData);
  await user?.updateActivity(userData);
  console.log(user);
};

export const updateAllUserInformation: Function = async () => {
  const userList = await getAllUser();
  userList.map(async (u: DocumentType<Users>) => {
    const { nickname } = u;
    console.info(`${nickname} 처리 중`);
    await updateUserInformation(u.nickname);
  });
};

const getAllUser: Function = async () => {
  const userList = await UserModel.find({}).exec();
  return userList;
};

export const deleteRemainNotCertifiedUser: Function =
  async (): Promise<void> => {
    await UserModel.deleteMany({ certified: false });
  };
