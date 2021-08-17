export interface UserInform {
  name: string;
  avatar_url: string;
  generation: number;
  nickname: string;

  followers: number;
  following: number;

  repos_url: string;
  public_repos: number;
  public_gists: number;

  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  twitter_username: string | null;
}

export interface UserUpdateInput {
  contributions: number;
  pullRequests: number;
  issues: number;
  repositoriesContributedTo: number;
  publicRepositories: number;
  stared: number;
  forked: number;
  followers: number;
  following: number;
}
