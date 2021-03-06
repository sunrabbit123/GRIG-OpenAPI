import { queryType } from "nexus";
import * as q from "./queries";

export const Query = queryType({
  definition(t) {
    t.list.field("ranking", q.userRanking);
    t.list.field("generations", q.hasGeneration);
  },
});
