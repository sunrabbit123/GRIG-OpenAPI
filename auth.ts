"use strict";

import * as mongoose from "mongoose";

import { serverless_DTO } from "./DTO";

import { UserModel } from "./src/model/users";
import { getAccessTokenByCode, getUserByToken } from "./src/util/github";
import { generateToken, verifyToken } from "./src/util/token";
import { sendAuthMessage } from "./src/util/email";
import { JsonWebTokenError } from "jsonwebtoken";

interface CreateUserInterface {
  access_token: string;
  name: string;
  nickname: string;
  generation: number;
}
const createRes: Function = (
  status: number,
  body?: Object,
  headers?: Object
) => {
  return {
    statusCode: status,
    body: JSON.stringify(body),
    headers: headers,
  };
};

exports.authUserByOAuth = async (
  event: serverless_DTO.eventType,
  _: any,
  cb: Function
) => {
  const data = event.queryStringParameters;
  const access_token = (await getAccessTokenByCode(data.code)).access_token;
  const { name, nickname } = await getUserByToken(access_token);

  const code = generateToken({ name: name, nickname: nickname });

  await createUser({
    accessToken: access_token,
    name: name,
    nickname: nickname,
  }); // redis 필요

  cb(
    null,
    createRes(
      302,
      {},
      { Location: `${process.env.AUTH_BASEURL}email_auth.html?code=${code}` }
    )
  );
};

exports.authEmail = async (
  event: serverless_DTO.eventType,
  _: any,
  cb: Function
) => {
  const searchPrams = new URLSearchParams(event.body);
  const code = searchPrams.get("code");
  const email = searchPrams.get("email");

  if (email.slice(-10) !== "@gsm.hs.kr" || !email.startsWith("s")) {
    return cb(null, createRes(400, { detail: "GSM 학생 계정이어야합니다." }));
  }

  const nickname = verifyToken(code).nickname;
  const jwt = generateToken({ email: email, nickname: nickname }, "5m"); // redis로 대체
  await sendAuthMessage({ receiver: email, nickname: nickname, jwt: jwt });
  cb(null, createRes(204));
};

exports.authUserByEmail = async (
  event: serverless_DTO.eventType,
  _: any,
  cb: Function
) => {
  const { jwt } = event.pathParameters;

  const data = verifyToken(jwt);
  const email = data.email;

  const generation: number = email.slice(1, 3) * 1 - 16;
  const user = findUserFromNickname(data.nickname);
  await user.updateGeneration(generation);
  cb(null, createRes(200, { asdf: "asdf" }));
};

const createUser: Function = async (data: CreateUserInterface) => {
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

const findUserFromNickname: Function = async (nickname: string) => {
  mongoose
    .connect(process.env.MONGO_URL ?? "", {
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then((): void => console.log("MongoDB connected"))
    .catch((err: Error): void =>
      console.log("Failed to connect MongoDB: ", err)
    );

  const result = await new UserModel.findUserFromToken(nickname);
  return result;
};
