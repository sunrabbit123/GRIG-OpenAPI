import { updateAllUserInformation } from "./user";

async function main(): Promise<void> {
  await updateAllUserInformation();
  return;
}

require("dotenv").config();
main();
