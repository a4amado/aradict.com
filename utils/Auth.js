import { verify } from "jsonwebtoken";
import { ThirdLayer, SecondLayer, FirstLayer } from "./AuthLayers";

const isAuth = (req, res, next) => {
  verify(req.cookies?.token, process.env.JWT_SECRET, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(403).send("NOT_AUTH");
    }
    req.user = data;
    return next();
  });
};

const ThirdLayerAuth = [
  isAuth,
  (req, res, next) => {
    if (!ThirdLayer.includes(req?.user?.role))
      return res.status(403).send("NO_AUTH");
    return next();
  },
];

const SecondLayerAuth = [
  isAuth,
  (req, res, next) => {
    if (!SecondLayer.includes(req?.user?.role))
      return res.status(403).send("NO_AUTH");
    return next();
  },
];
FirstLayer;
const FirstLayerAuth = [
  (req, res, next) => {
    if (!FirstLayer.includes(req?.user?.role))
      return res.status(403).send("NO_AUTH");
    return next();
  },
];

export { ThirdLayerAuth, SecondLayerAuth, FirstLayerAuth };
