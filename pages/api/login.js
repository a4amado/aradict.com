import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { createRouter } from "next-connect";
import * as Yup from "yup";
 

const Router = createRouter();

Router.use(async (req, res, next) => {
  const LoginSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required().min(8),
  });
  LoginSchema.validate(req.body, { abortEarly: false })
    .then(() => next())
    .catch((errors) => res.status(403).json(errors));
});


Router.post(async (req, res) => {
  const { username, password } = req.body;

  const Query = `
  
  SELECT username, _role as role, user_id
  FROM users
    WHERE username  =  '${username}';
  `

  const user = {
    role:"admin",
    username: "dddd",
    user_id: "dddddddddddddddddddddddddddddddd"
  }
 
  console.table(user.rows[0])
  const JWT_HASH = sign(
    user,
    process.env.JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );
  res.setHeader(
    "Set-Cookie",
    serialize("token", JWT_HASH, { httpOnly: true, path: "/" })
  );
  return res.status(200).send("5345");
});

export default Router.handler({
  onNoMatch: (req, res, next) => {
    return res.status(404).send("sssssssss");
  },
  onError: (req, res, next) => {
    return res.status(500).send("sssssssss");
  },
});
