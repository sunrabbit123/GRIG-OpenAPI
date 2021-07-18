import { stringArg } from "nexus";

import { UserService } from "../../../service";

export const user = {
  type: "User",
  args: { nickname: stringArg() },
  resolve: async (_: any, args: { nickname: string }, __: any) => {
    return await UserService.getUser(args.nickname);
  },
};
