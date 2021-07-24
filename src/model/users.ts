import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { Schema } from "mongoose";

@modelOptions({
  schemaOptions: {
    collection: "users",
    toObject: {
      virtuals: true,
    },
  },
})
export class Users {
  public _id!: Schema.Types.ObjectId;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public nickname!: string;

  @prop({ required: true })
  public generation!: number;

  @prop({ default: 0 })
  public contributions?: number;

  @prop({ default: 0 })
  public pullRequests?: number;

  @prop({ default: 0 })
  public issues?: number;

  @prop({ default: 0 })
  public repositoriesContributedTo?: number;

  @prop({ default: 0 })
  public stared?: number;

  @prop({ default: 0 })
  public forked?: number;

  @prop({ default: 0 })
  public followers?: number;

  @prop({ default: 0 })
  public following?: number;

  public get id(): Schema.Types.ObjectId {
    return this._id;
  }
}

const UserModel = getModelForClass(Users);
export default UserModel;
