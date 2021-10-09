import { UserModel } from "../model/users";

export const getKindOfGenaration: Function = async () => {
  return await UserModel.aggregate([
    // count grouping status
    { $group: { _id: "$generation", count: { $sum: 1 } } },
  ]);
};
