import { intArg, stringArg } from "nexus";
import * as mongoose from "mongoose";

import { INFORMATION_DTO } from "../../../DTO";
import { UserModel } from "../../../model/users";

export const ranking = {
  type: "User",
  args: { criteria: stringArg(), count: intArg(), page: intArg() },
  resolve: async (_: any, args: INFORMATION_DTO.GetRankingInput, __: any) => {
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
    return await UserModel.getRanking(args);
  },
};

export const hasGeneration = {
  type: "",
};
