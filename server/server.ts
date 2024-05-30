import express from "express";
import { createPostHandler, listPostsHandler } from "./handlers/postHandlers";
import asyncHandler from "express-async-handler";
import { initdb } from "./dataStore";
import { signInHandler, signUpHandler } from "./handlers/authHandler";
import { requestLoggerMiddleware } from "./middlewares/loggerMiddleware";
import { errHandler } from "./middlewares/errorMiddleware";
import dotenv from "dotenv";
import { authMiddleware } from "./middlewares/authMiddleware";

(async () => {
  await initdb();
  dotenv.config();

  const app = express();

  app.use(express.json());

  app.use(requestLoggerMiddleware);

  // Public endpoints
  app.get("/healthz", (_req, res) => {
    res.send({ status: "Ok ✌️" });
  });

  app.post("/v1/signup", asyncHandler(signUpHandler));
  app.post("/v1/signin", asyncHandler(signInHandler));

  app.use(authMiddleware);

  // Protected endpoints
  app.get("/v1/posts", asyncHandler(listPostsHandler));
  app.post("/v1/posts", asyncHandler(createPostHandler));

  app.use(errHandler);

  app.listen(process.env.PORT || 8090, () => {
    console.log("listen to port 8090");
  });
})();
