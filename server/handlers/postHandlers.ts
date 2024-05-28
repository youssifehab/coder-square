import {
  CreatePostRequest,
  CreatePostResponse,
  ListPostsRequest,
  ListPostsResponse,
} from "../api";
import { db } from "../dataStore";
import { ExpressHandler, Post } from "../types";
import crypto from "crypto";

export const listPostsHandler: ExpressHandler<
  ListPostsRequest,
  ListPostsResponse
> = async (_req, res) => {
  try {
    res.send({ posts: await db.listPosts() });
  } catch (err) {
    console.error(err);
  }
};

export const createPostHandler: ExpressHandler<
  CreatePostRequest,
  CreatePostResponse
> = async (req, res) => {
  // TODO: Validate user exists
  // TODO: Get user Id session
  // TODO: Validate title and url are true
  // TODO: Validate url is unique, otherwise +1 to existing post
  if (!req.body.title || !req.body.url || !req.body.userId) {
    return res.sendStatus(400);
  }
  const post: Post = {
    id: crypto.randomUUID(),
    postedAt: Date.now(),
    title: req.body.title,
    url: req.body.url,
    userId: req.body.userId,
  };
  await db.createPost(post);
  res.sendStatus(200);
};
