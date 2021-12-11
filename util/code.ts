import * as mongoose from "mongoose";
import { CodeModel } from "../src/model/code";

export const deleteRemainCode: Function = async (): Promise<void> => {
  

  var dateTime = new Date();
  dateTime.setMinutes(dateTime.getMinutes() - 5);
  await CodeModel.deleteMany({ createdAt: { $lte: dateTime } });
  console.log("사용되지않는 코드들 제거 완료");
  return;
};
