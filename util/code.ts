import { CodeModel } from "../src/model/code";

export const deleteRemainCode: Function = async (): Promise<void> => {
  var dateTime = new Date();
  dateTime.setMinutes(dateTime.getMinutes() - 5);
  await CodeModel.deleteMany({ createdAt: { $lte: dateTime } });
};
