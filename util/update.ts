import { updateAllUserInformation, deleteRemainNotCertifiedUser } from "./user";
import { deleteRemainCode } from "./code";
async function main(): Promise<void> {
  await updateAllUserInformation();
  await deleteRemainDocument();
}

async function deleteRemainDocument(): Promise<void> {
  await deleteRemainNotCertifiedUser();
  await deleteRemainCode();
}

require("dotenv").config();
main();
