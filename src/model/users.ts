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
  // section 1
  public _id!: mongoose.Types.ObjectId;

  @prop({ required: true })
  public accessToken!: string;

  @prop({ required: true, default: false })
  public certified!: boolean;

  // section 2
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public nickname!: string;

  @prop({})
  public avatar_url?: string;

  @prop({})
  public generation?: number;

  // section 3
  @prop({ default: 0 })
  public followers?: number;

  @prop({ default: 0 })
  public following?: number;

  //section 4
  @prop({ default: 0 })
  public public_repos?: number;

  @prop({ required: false })
  public repos_url?: string;

  @prop({ default: 0 })
  public public_gists?: number;

  //section 5
  @prop({ default: "" })
  public company?: string;

  @prop({ default: "" })
  public blog?: string;

  @prop({ default: "" })
  public location?: string;

  @prop({ default: "" })
  public email?: string;

  @prop({ default: "" })
  public bio?: string;

  @prop({ default: "" })
  public twitter_username?: string;

  // section 6

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

  public get id(): mongoose.Types.ObjectId {
    return this._id;
  }
  public async updateActivity(
    this: DocumentType<Users>,
    arg: UserDTO.UserUpdateInput
  ): Promise<void> {
    const {
      contributions,
      pullRequests,
      issues,
      repositoriesContributedTo,
      stared,
      forked,
      name,
      avatar_url,
      followers,
      following,
      repos_url,
      public_repos,
      public_gists,
      company,
      blog,
      location,
      email,
      bio,
      twitter_username,
    } = arg;

    this.contributions = contributions;
    this.pullRequests = pullRequests;
    this.issues = issues;
    this.repositoriesContributedTo = repositoriesContributedTo;
    this.stared = stared;
    this.forked = forked;

    this.name = name;
    this.avatar_url = avatar_url;

    this.following = following;
    this.followers = followers;

    this.repos_url = repos_url;
    this.public_repos = public_repos;
    this.public_gists = public_gists;

    this.company = company ?? this.company;
    this.blog = blog;
    this.location = location;
    this.email = email;
    this.bio = bio;
    this.twitter_username = twitter_username;
    await this.save();
  }
  public async updateGeneration(
    this: DocumentType<Users>,
    generation: number
  ): Promise<void> {
    this.generation = generation;
    await this.save();
  }
  public async setCertifiedTrue(this: DocumentType<Users>): Promise<void> {
    this.certified = true;
    await this.save();
  }

  public static async getRanking(
    this: ModelType<Users> & typeof Users,
    options: INFORMATION_DTO.GetRankingInput
  ): Promise<Array<DocumentType<Users>>> {
    const userList = await this.find({ certified: true })
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
