import crypto from "crypto";

import {
  SignInRequest,
  SignInResponse,
  SignUpResponse,
  SignUpRquest,
} from "../api";
import { db } from "../dataStore";
import { ExpressHandler, User } from "../types";
import { signJwt } from "../auth";

export const signUpHandler: ExpressHandler<
  SignUpRquest,
  SignUpResponse
> = async (req, res) => {
  const { email, firstname, lastname, password, username } = req.body;
  if (!email || !firstname || !lastname || !password || !username) {
    return res.status(400).send({ error: "All fields are required." });
  }

  const existing =
    (await db.getUserByEmail(email)) || (await db.getUserByusername(username));
  if (existing) {
    return res.status(403).send({ error: "User already exist." });
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
  const jwt = signJwt({ userId: user.id });
  return res.status(200).send({ jwt });
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
  const jwt = signJwt({ userId: existing.id });
  return res.status(200).send({
    user: {
      email: existing.email,
      firstname: existing.firstname,
      lastname: existing.lastname,
      username: existing.username,
      id: existing.id,
    },
    jwt,
  });
};
