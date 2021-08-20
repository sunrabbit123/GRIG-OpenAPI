import * as mongoose from "mongoose";

import { updateAllUserInformation, deleteRemainNotCertifiedUser } from "./user";
import { deleteRemainCode } from "./code";
async function main(): Promise<void> {
  require("dotenv").config();
  const db = await mongoose.connect(process.env.MongoDBUrl ?? "", {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  await updateAllUserInformation();
  console.info("유저 업데이트 완료\n필요 없는 데이터 삭제 시작");
  await deleteRemainDocument();

  await db.disconnect();
}

async function deleteRemainDocument(): Promise<void> {
  await deleteRemainNotCertifiedUser();
  console.info("인증되지 않은 유저 삭제 완료");
  await deleteRemainCode();
  console.info("사용되지않은 코드들 삭제 완료");
}
main();
