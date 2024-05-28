import { open as sqliteOpen } from "sqlite";
import sqlite3 from "sqlite3";
import path from "path";

import { DataStore } from "..";
import { User, Comment, Like, Post } from "../../types";

export class SqlDataStore implements DataStore {
  public async openDb() {
    const db = await sqliteOpen({
      filename: path.join(__dirname, "codersquare.sqlite"),
      driver: sqlite3.Database,
    });

    await db.migrate({
      migrationsPath: path.join(__dirname, "migrations"),
    });
    return this;
  }

  createUser(_user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getUserByEmail(_email: string): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }
  getUserByUserName(_username: string): Promise<User | undefined> {
    throw new Error("Method not implemented.");
  }
  createComment(_comment: Comment): Promise<void> {
    throw new Error("Method not implemented.");
  }
  listComments(_postId: string): Promise<Comment[]> {
    throw new Error("Method not implemented.");
  }
  deleteComment(_id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  createLike(_like: Like): Promise<void> {
    throw new Error("Method not implemented.");
  }
  listPosts(): Promise<Post[]> {
    throw new Error("Method not implemented.");
  }
  createPost(_post: Post): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getPost(_id: string): Promise<Post | undefined> {
    throw new Error("Method not implemented.");
  }
  deletePost(_id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
