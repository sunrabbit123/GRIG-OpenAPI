import { mongoose } from "@typegoose/typegoose";
import { deleteRemainCode } from "./code";
import { deleteRemainNotCertifiedUser } from "./user";

async function deleteRemainDocument(): Promise<void> {
  const db = await mongoose.connect(process.env.MongoDBUrl ?? "", {
    useFindAndModify: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  await deleteRemainNotCertifiedUser();
  await deleteRemainCode();

  await db.disconnect();
  return;
}

require("dotenv").config();
deleteRemainDocument();
