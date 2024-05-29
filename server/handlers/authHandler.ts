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
  const { email, firstname, lastname, password, username } = req.body;
  if (!email || !firstname || !lastname || !password || !username) {
    return res.status(400).send("All fields are required.");
  }

  const existing =
    (await db.getUserByEmail(email)) || (await db.getUserByusername(username));
  if (existing) {
    return res.status(403).send("User already exist.");
  }

  const user: User = {
    id: crypto.randomUUID(),
    firstname,
    lastname,
    username,
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
    (await db.getUserByEmail(login)) || (await db.getUserByusername(login));
  if (!existing || existing.password !== password) {
    return res.sendStatus(403);
  }
  return res.status(200).send({
    email: existing.email,
    firstname: existing.firstname,
    lastname: existing.lastname,
    username: existing.username,
    id: existing.id,
  });
};
