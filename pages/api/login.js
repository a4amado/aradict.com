import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import * as Yup from "yup";

import nextConnect from "next-connect";
const Router = nextConnect({
  onNoMatch: (req, res) => {
    res.status().end("Not Found").end();
  },
  onError: (err, req, res) => {
    res.status(500).send("Some thing went wrong").end();
  },
});

const LoginSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required().min(8),
});

Router.use(async (req, res, next) => {
  console.log("Sss");
  try {
    await LoginSchema.validate(req.body);
    next();
  } catch (error) {
    res.status(500).json(error).end();
  }
});

Router.post(async (req, res) => {
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

export default Router;
