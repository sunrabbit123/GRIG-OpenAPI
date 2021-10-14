import { intArg, stringArg } from "nexus";
import * as mongoose from "mongoose";

import { INFORMATION_DTO } from "../../../DTO";
import { UserModel } from "../../../model/users";
import { getKindOfGenaration } from "../../../service/user";

export const userRanking = {
  type: "User",
  args: {
    criteria: stringArg(),
    count: intArg(),
    page: intArg(),
    generation: intArg(),
  },
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
    return UserModel.getRanking(args);
  },
};

export const hasGeneration = {
  type: "Generation",
  resolve: async (_: any, __: any, ___: any) => {
    const db = await mongoose.connect(process.env.MongoDBUrl ?? "", {
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    const result = await getKindOfGenaration();
    if (result) {
      db.disconnect();
      return result;
    }
  },
};
