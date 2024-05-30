import { Post, User } from "./types";

// Post APIs
export interface ListPostsRequest {}
export interface ListPostsResponse {
  posts: Post[];
}
export type CreatePostRequest = Pick<Post, "title" | "url">;
export interface CreatePostResponse {}

export interface GetPostRequest {}
export interface GetPostResponse {
  post: Post;
}

// Comment APIs

// Like APIs

// User APIs
export type SignUpRquest = Pick<
  User,
  "firstname" | "lastname" | "username" | "email" | "password"
>;
export interface SignUpResponse {
  jwt: string;
}
export interface SignInRequest {
  login: string; //username or email
  password: string;
}
export type SignInResponse = {
  user: Pick<User, "firstname" | "lastname" | "username" | "email" | "id">;
  jwt: string;
};
