import { updateAllUserInformation } from "./user";

async function main(): Promise<void> {
  require("dotenv").config();
  await updateAllUserInformation(process.env.MongoDBUrl);
}

main();
