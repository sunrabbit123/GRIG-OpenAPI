import { intArg, stringArg } from "nexus";
import { objectType } from "nexus";

import * as mongoose from "mongoose";

import { UserModel } from "../../../model/users";
import { INFORMATION_DTO } from "../../../DTO";
import { getKindOfGenaration } from "../../../service/user";

export const Ranking = objectType({
  name: "Ranking",
  definition(t) {
    t.string("foo");
    t.list.field("userList", {
      type: "User",
      args: { criteria: stringArg(), count: intArg(), page: intArg(), generation: intArg()},
      resolve: async (_, args: INFORMATION_DTO.GetRankingInput, __) => {
        const db = await mongoose.connect(process.env.MongoDBUrl ?? "", {
          useFindAndModify: false,
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
        });
        const result = await UserModel.getRanking(args);
        if (result) {
          db.disconnect();
          return result;
        }
      },
    });

    t.list.field("generations", {
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
    });
  },
});

export const generations = objectType({
  name: "Generation",
  definition(t) {
    t.int("_id");
    t.int("count");
  },
});
