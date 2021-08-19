import {
  getModelForClass,
  modelOptions,
  prop,
  DocumentType,
} from "@typegoose/typegoose";
import { ModelType } from "@typegoose/typegoose/lib/types";

import * as mongoose from "mongoose";

import { INFORMATION_DTO, UserDTO } from "../DTO";

@modelOptions({
  schemaOptions: {
    collection: "users",
    toObject: {
      virtuals: true,
    },
  },
})
export class Users {
  public _id!: mongoose.Types.ObjectId;

  @prop({ required: true })
  public accessToken!: string;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public nickname!: string;

  @prop({})
  public generation?: number;

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

  public get id(): mongoose.Types.ObjectId {
    return this._id;
  }
  public async updateActivity(
    this: DocumentType<Users>,
    arg: UserDTO.UserUpdateInput
  ): Promise<void> {
    this.contributions = arg.contributions;
    this.pullRequests = arg.pullRequests;
    this.issues = arg.issues;
    this.repositoriesContributedTo = arg.repositoriesContributedTo;
    this.stared = arg.stared;
    this.forked = arg.forked;
    this.followers = arg.followers;
    this.following = arg.following;
    await this.save();
  }
  public async updateGeneration(
    this: DocumentType<Users>,
    generation: number
  ): Promise<void> {
    this.generation = generation;
    await this.save();
  }

  public static async getRanking(
    this: ModelType<Users> & typeof Users,
    options: INFORMATION_DTO.GetRankingInput
  ): Promise<Array<DocumentType<Users>>> {
    const userList = await this.find()
      .sort(INFORMATION_DTO.RankingSortCriteria[options.criteria])
      .skip((options.page - 1) * options.count)
      .limit(options.count)
      .exec();
    return userList;
  }

  public static async findUserFromNickname(
    this: ModelType<Users> & typeof Users,
    nickname: string
  ): Promise<DocumentType<Users> | null> {
    const user = await this.findOne({ nickname: nickname }).exec();
    return user;
  }
}

export const UserModel = getModelForClass(Users);
