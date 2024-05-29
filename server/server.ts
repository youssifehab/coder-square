import express from "express";
import { createPostHandler, listPostsHandler } from "./handlers/postHandlers";
import asyncHandler from "express-async-handler";
import { initdb } from "./dataStore";
import { signInHandler, signUpHandler } from "./handlers/authHandler";
import { requestLoggerMiddleware } from "./middlewares/loggerMiddleware";
import { errHandler } from "./middlewares/errorMiddleware";

(async () => {
  await initdb();
  const app = express();

  app.use(express.json());

  app.use(requestLoggerMiddleware);

  app.get("/v1/posts", asyncHandler(listPostsHandler));
  app.post("/v1/posts", asyncHandler(createPostHandler));

  app.post("/v1/signup", asyncHandler(signUpHandler));
  app.post("/v1/signin", asyncHandler(signInHandler));

  app.use(errHandler);

  app.listen(8090, () => {
    console.log("listen to port 8090");
  });
})();
