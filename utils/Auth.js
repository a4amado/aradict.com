import { verify } from "jsonwebtoken";
import { ThirdLayer } from "./AuthLayers";

const isAuth = (req, res, next) => {
  verify(req.cookies?.token, process.env.JWT_SECRET, (err, data) => {
    console.log("err");
    if (err) return res.status(403).send("NOT_AUTH");
    req.user = data;
    return next();
  });
};

const ThirdLayerAuth = [
  isAuth,
  (req, res, next) => {
    console.log("err2");
    if (!ThirdLayer.includes(req?.user?.role))
      return res.status(403).send("NO_AUTH");
    return next();
  },
];

const SecondLayerAuth = [
  isAuth,
  (req, res, next) => {
    if (req.user.role != "voice-reviwer")
      return res.status(403).send("NOT_VOIVE_REVIWER");
    return next();
  },
];

const FirstLayerAuth = [
  (req, res, next) => {
    if (req.user.role != "voice-contributer")
      return res.status(403).send("NO_VOIVE_CONTRIBUTER");
    return next();
  },
];

export { ThirdLayerAuth, SecondLayerAuth, FirstLayerAuth };
