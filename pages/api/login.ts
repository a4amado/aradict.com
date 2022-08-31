import { serialize } from 'cookie';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import * as JWT from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect, { NextHandler } from 'next-connect';
import * as Yup from 'yup';

import prisma from '../../DB';
import { jwtSign } from '../../utils/jwt';
import Redirect from '../../utils/redirect';

const Route = nextConnect<NextApiRequest, NextApiResponse>({
  onNoMatch: (req, res) => {
    res.status(404);
    res.end("Not Found");
    res.end();
  },
  onError: (err, req, res) => {
    res.status(500);
    res.send("Some thing went wrong");
    res.end();
  },
});

const LoginSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required().min(8),
});

Route.use<NextApiRequest, NextApiRequest>(
  async (req, res, next: NextHandler) => {
    console.log("Sss");
    try {
      await LoginSchema.validate(req.body);
      next();
    } catch (error) {
      res.status(500);
      res.json(error);
      res.end();
    }
  }
);

Route.post<NextApiRequest, NextApiResponse>(async (req, res) => {
  const user = {
    role: "admin",
    rank: 0,
    username: "dddd",
    user_id: "dddddddddddddddddddddddddddddddd",
  };

  const JWT_SECRET = process.env.JWT_SECRET;
  let JWT_HASH;
  try {
    JWT_HASH = JWT.sign(user, JWT_SECRET, {
      expiresIn: "2h"
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ msg: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }

  res.setHeader(
    "Set-Cookie",
    serialize("token", JWT_HASH, { httpOnly: true, path: "/" })
  );

  res.end();
});

export default Route;
