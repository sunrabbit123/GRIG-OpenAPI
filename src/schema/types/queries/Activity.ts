import { stringArg } from "nexus";

import { ActivityService } from "../../../service";

export const activity = {
  type: "Activity",
  args: { nickname: stringArg() },
  resolve: async (_: any, args: { nickname: string }, __: any) => {
    return await ActivityService.getActivityByUser(args.nickname);
  },
};
