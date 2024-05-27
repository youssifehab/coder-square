import express, { RequestHandler } from "express";
import { createPostHandler, listPostsHandler } from "./handlers/postHandlers";

const app = express();

app.use(express.json());

const requestLoggerMiddleware: RequestHandler = (req, _res, next) => {
  console.log(req.method, req.path, " body: ", req.body);
  next();
};

app.use(requestLoggerMiddleware);

app.get("/posts", listPostsHandler);
app.post("/posts", createPostHandler);

app.listen(8090, () => {
  console.log("listen to port 8090");
});
