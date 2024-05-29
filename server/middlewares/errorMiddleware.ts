import { ErrorRequestHandler } from "express";

export const errHandler: ErrorRequestHandler = (err, _req, res, next) => {
  console.error("Uncaought Exception: ", err);
  return res
    .status(500)
    .send("Oops, uncaught exception occured, please try again.");
  next();
};
