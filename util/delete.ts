import { deleteRemainCode } from "./code";
import { deleteRemainNotCertifiedUser } from "./user";

async function deleteRemainDocument(): Promise<void> {
  await deleteRemainNotCertifiedUser();
  await deleteRemainCode();
  return;
}

require("dotenv").config();
deleteRemainDocument();
