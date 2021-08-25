import { queryType } from "nexus";
import * as q from "./queries";

export const Query = queryType({
  definition(t) {
    t.field("user", q.user);
    t.list.field("ranking", q.ranking);
  },
});
