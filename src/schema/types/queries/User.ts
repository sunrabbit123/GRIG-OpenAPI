import { stringArg } from "nexus";
import * as mongoose from "mongoose";

import { UserModel } from "../../../model/users";

export const user = {
  type: "User",
  args: { nickname: stringArg() },
  resolve: async (_: any, args: { nickname: string }, __: any) => {
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
    return await UserModel.findUserFromNickname(args.nickname);
  },
};
