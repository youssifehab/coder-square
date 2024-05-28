import { UserDao } from "./DAO/UserDAO";
import { CommentDao } from "./DAO/CommentDAO";
import { LikeDao } from "./DAO/LikeDAO";
import { PostDao } from "./DAO/PostDAO";
import { InMemoryDataStore } from "./memoryDB";
export interface DataStore extends UserDao, CommentDao, LikeDao, PostDao {}

export const db = new InMemoryDataStore();
