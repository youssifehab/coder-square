import crypto from "crypto";

import {
  SignInRequest,
  SignInResponse,
  SignUpResponse,
  SignUpRquest,
} from "../api";
import { db } from "../dataStore";
import { ExpressHandler, User } from "../types";

export const signUpHandler: ExpressHandler<
  SignUpRquest,
  SignUpResponse
> = async (req, res) => {
  const { email, firstName, lastName, password, userName } = req.body;
  if (!email || !firstName || !lastName || !password || !userName) {
    return res.status(400).send("All fields are required.");
  }

  const existing =
    (await db.getUserByEmail(email)) || (await db.getUserByUserName(userName));
  if (existing) {
    return res.status(403).send("User already exist.");
  }

  const user: User = {
    id: crypto.randomUUID(),
    firstName,
    lastName,
    userName,
    email,
    password,
  };
  await db.createUser(user);
  return res.sendStatus(200);
};

export const signInHandler: ExpressHandler<
  SignInRequest,
  SignInResponse
> = async (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.status(400);
  }
  const existing =
    (await db.getUserByEmail(login)) || (await db.getUserByUserName(login));
  if (!existing || existing.password !== password) {
    return res.sendStatus(403);
  }
  return res.status(200).send({
    email: existing.email,
    firstName: existing.firstName,
    lastName: existing.lastName,
    userName: existing.userName,
    id: existing.id,
  });
};
