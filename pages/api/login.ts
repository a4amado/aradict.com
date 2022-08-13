import { NextApiRequest, NextApiResponse } from "next";

import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import * as Yup from "yup";
import prisma from "../../DB";

 
import nextConnect, { NextHandler, ErrorHandler } from "next-connect";

const Route = nextConnect<NextApiRequest, NextApiResponse>({
  onNoMatch: (req, res) => {
    res.status(404)
    res.end("Not Found")
    res.end();
  },
  onError: (err, req, res) => {
    res.status(500)
    res.send("Some thing went wrong")
    res.end()
  },
});

const LoginSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required().min(8),
});

Route.use<NextApiRequest, NextApiRequest>(async (req, res, next: NextHandler) => {
  
  console.log("Sss");
  try {
    await LoginSchema.validate(req.body);
    next();
  } catch (error) {
    res.status(500)
    res.json(error)
    res.end()
  }
});

Route.post<NextApiRequest, NextApiResponse>(async (req, res) => {
   const user = {
    role: "admin",
    username: "dddd",
    user_id: "dddddddddddddddddddddddddddddddd",
  };

  
  const JWT_HASH = sign(user, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
  res.setHeader(
    "Set-Cookie",
    serialize("token", JWT_HASH, { httpOnly: true, path: "/" })
  );
  

   res.end();
});

export default Route;
