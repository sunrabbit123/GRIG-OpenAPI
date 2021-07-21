import { objectType } from "nexus";
import { ActivityService } from "../../../service";

export const User = objectType({
  name: "User",
  definition(t) {
    t.string("name");
    t.int("generation");
    t.string("nickname");
    t.int("followers");
    t.int("following");
    t.string("repos_url");
    t.int("public_repos");
    t.string("company");
    t.string("blog");
    t.string("location");
    t.string("email");
    t.string("bio");
    t.string("twitter_username");
    t.field("activities", {
      type: "Activity",
      resolve: async (root: any, _, __) => {
        return await ActivityService.getActivityByUser(root.nickname);
      },
    });
  },
});
