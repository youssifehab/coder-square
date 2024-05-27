import express, { RequestHandler } from "express";
import { db } from "./dataStore/index";

const app = express();

app.use(express.json());

// const posts: any[] = [];

const requestLoggerMiddleware: RequestHandler = (req, _res, next) => {
  console.log(req.method, req.path, " body: ", req.body);
  next();
};

app.use(requestLoggerMiddleware);

app.get("/posts", (_req, res) => {
  res.send({ posts: db.listPosts() });
});

app.post("/posts", (req, res) => {
  const post = req.body;
  db.createPost(post);
  res.sendStatus(200);
});

app.listen(8090, () => {
  console.log("listen to port 8090");
});
