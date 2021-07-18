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

  company: string;
  blog: string;
  location: string;
  email: string;
  bio: string;
  twitter_username: string;
}
