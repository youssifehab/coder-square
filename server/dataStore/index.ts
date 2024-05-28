import { UserDao } from "./DAO/UserDAO";
import { CommentDao } from "./DAO/CommentDAO";
import { LikeDao } from "./DAO/LikeDAO";
import { PostDao } from "./DAO/PostDAO";
// import { InMemoryDataStore } from "./memoryDB";
import { SqlDataStore } from "./sql";
export interface DataStore extends UserDao, CommentDao, LikeDao, PostDao {}

export let db: DataStore;
export const initdb = async () => {
  //   db = new InMemoryDataStore();
  db = await new SqlDataStore().openDb();
};
