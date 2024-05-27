import { UserDao } from "./UserDAO";
import { CommentDao } from "./CommentDAO";
import { LikeDao } from "./LikeDAO";
import { PostDao } from "./PostDAO";
import { InMemoryDataStore } from "./memoryDB";
export interface DataStore extends UserDao, CommentDao, LikeDao, PostDao {}

export const db = new InMemoryDataStore();
