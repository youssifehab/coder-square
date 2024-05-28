import express, { ErrorRequestHandler, RequestHandler } from "express";
import { createPostHandler, listPostsHandler } from "./handlers/postHandlers";
import asyncHandler from "express-async-handler";
import { initdb } from "./dataStore";
import { signInHandler, signUpHandler } from "./handlers/userHandler";

(async () => {
  await initdb();
  const app = express();

  app.use(express.json());

  const requestLoggerMiddleware: RequestHandler = (req, _res, next) => {
    console.log(req.method, req.path, " body: ", req.body);
    next();
  };

  app.use(requestLoggerMiddleware);

  app.get("/v1/posts", asyncHandler(listPostsHandler));
  app.post("/v1/posts", asyncHandler(createPostHandler));

  app.post("/v1/signup", asyncHandler(signUpHandler));
  app.post("/v1/signin", asyncHandler(signInHandler));

  const errHandler: ErrorRequestHandler = (err, _req, res, next) => {
    console.error("Uncaought Exception: ", err);
    return res
      .status(500)
      .send("Oops, uncaught exception occured, please try again.");
    next();
  };
  app.use(errHandler);

  app.listen(8090, () => {
    console.log("listen to port 8090");
  });
})();
