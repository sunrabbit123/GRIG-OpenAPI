import { updateAllUserInformation, deleteRemainNotCertifiedUser } from "./user";
import { deleteRemainCode } from "./code";
async function main(): Promise<void> {
  await updateAllUserInformation();
  // await deleteRemainDocument();
  return;
}

async function deleteRemainDocument(): Promise<void> {
  await deleteRemainNotCertifiedUser();
  await deleteRemainCode();
  return;
}

require("dotenv").config();
main();
