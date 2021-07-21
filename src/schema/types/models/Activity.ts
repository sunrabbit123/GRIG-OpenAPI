import { objectType } from "nexus";

export const Activity = objectType({
  name: "Activity",
  definition(t) {
    t.int("contributions");
    t.int("followers");
    t.int("following");
    t.int("pullRequests");
    t.int("issues");
    t.int("repositoriesContributedTo");
    t.int("publicRepositories");
    t.list.field("repositoriesInform", {
      type: "RepositoriesInform",
    });
    t.int("stared", {
      resolve: async (root: any, __, ___) => {
        return root.repositoriesInform.reduce((prev: number, curr: any) => {
          return prev + curr.stargazers.totalCount;
        }, 0);
      },
    });
    t.int("forked", {
      resolve: async (root: any, _, __) => {
        return root.repositoriesInform.reduce((prev: number, curr: any) => {
          return prev + curr.forkCount;
        }, 0);
      },
    });
  },
});

export const RepositoriesInform = objectType({
  name: "RepositoriesInform",
  definition(t) {
    t.int("forkCount");
    t.field("stargazers", {
      type: "stargazers",
    });
    t.int("starCount", {
      resolve: async (root: any, __, ___) => {
        return root.stargazers.totalCount;
      },
    });
  },
});

export const Stargazers = objectType({
  name: "stargazers",
  definition(t) {
    t.int("totalCount");
  },
});
