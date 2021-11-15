import { modelOptions, prop, getModelForClass } from "@typegoose/typegoose";
import { Schema } from "mongoose";

@modelOptions({
  schemaOptions: {
    collection: "codes",
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
      transform: (doc: any, ret: any): unknown => {
        ret.createdAt = doc.createdAt.getTime();
        return ret;
      },
    },
  },
})
export class Code {
  public _id!: Schema.Types.ObjectId;

  @prop({ required: true })
  public email!: string;

  @prop({ required: true })
  public nickname!: string;

  @prop({ default: new Date() })
  public createdAt!: Date;

  public get id(): Schema.Types.ObjectId {
    return this._id;
  }
}

export const CodeModel = getModelForClass(Code);
