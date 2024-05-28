import { open as sqliteOpen, Database } from "sqlite";
import sqlite3 from "sqlite3";
import path from "path";

import { DataStore } from "..";
import { User, Comment, Like, Post } from "../../types";

export class SqlDataStore implements DataStore {
  private db!: Database<sqlite3.Database, sqlite3.Statement>;
  public async openDb() {
    this.db = await sqliteOpen({
      filename: path.join(__dirname, "codersquare.sqlite"),
      driver: sqlite3.Database,
    });

    this.db.run("PRAGMA foreign_keys = ON;");

    await this.db.migrate({
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
    return this.db.all<Post[]>("SELECT * FROM posts");
  }
  async createPost(post: Post): Promise<void> {
    await this.db.run(
      "INSERT INTO posts (id, title, url, userId, postedAt) VALUES (?,?,?,?,?)",
      post.id,
      post.title,
      post.url,
      post.userId,
      post.postedAt
    );
  }
  getPost(_id: string): Promise<Post | undefined> {
    throw new Error("Method not implemented.");
  }
  deletePost(_id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
