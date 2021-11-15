import * as mongoose from "mongoose";
import { DocumentType } from "@typegoose/typegoose";

import { CodeModel } from "../src/model/code";
import { UserModel, Users } from "../src/model/users";
import { UserDTO } from "../src/DTO";
import { GithubAPI } from "../src/util";
import { BeAnObject } from "@typegoose/typegoose/lib/types";

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

export const updateUserInformation: Function = async (
  user: DocumentType<Users, BeAnObject>
) => {
  const { nickname } = user;
  const userInform = await GithubAPI.getActivityByUser(user.nickname);
  if (userInform == null) {
    return;
  }
  const repositories = userInform.repositories.nodes;
  const userActivityData: UserDTO.UserUpdateActivityInput = {
    contributions:
      userInform.contributionsCollection.contributionCalendar
        .totalContributions,
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
  const dataSet = await user.updateActivity(userData);
  return dataSet;
};

export const updateUserListInformation: Function = async (
  userList: DocumentType<Users, BeAnObject>[]
) => {
  return Promise.all(
    userList.map((u: DocumentType<Users>) => {
      const { nickname } = u;
      console.info(`${nickname} 처리 중`);
      try {
        return updateUserInformation(u);
      } catch (e) {
        console.log(e);
        return nickname;
      }
    })
  );
};

export const updateAllUserInformation: Function = async () => {
  const db = await mongoose.connect(process.env.MongoDBUrl ?? "", {
    useFindAndModify: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

  const userList = await UserModel.find({ certified: true }).exec();
  console.log(userList.length, "명이 등록되어 있음");
  const data = await updateUserListInformation(userList);
  if (data) {
    db.disconnect();
  }
  return;
};

export const deleteRemainNotCertifiedUser: Function =
  async (): Promise<void> => {
    await UserModel.deleteMany({ certified: false });
    console.log("인증처리가 되지않은 유저들 삭제 완료");
    return;
  };
