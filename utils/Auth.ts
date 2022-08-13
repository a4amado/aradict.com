import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';
import { verify, ErrorHandler } from "jsonwebtoken";
import { ThirdLayer, SecondLayer, FirstLayer } from "./AuthLayers";
import { NextHandler } from "next-connect";


const isAuth = (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
  verify(req.cookies?.token, process.env.JWT_SECRET, (err: ErrorHandler, data) => {
    if (err) return res.status(StatusCodes.NON_AUTHORITATIVE_INFORMATION).send(ReasonPhrases.NON_AUTHORITATIVE_INFORMATION);
    req.user = data;
    return next();
  });
};

const ThirdLayerAuth = [
  isAuth,
  (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    if (!ThirdLayer.includes(req?.user?.role))
       return res.status(StatusCodes.NON_AUTHORITATIVE_INFORMATION).send(ReasonPhrases.NON_AUTHORITATIVE_INFORMATION);
    return next();
  },
];

const SecondLayerAuth = [
  isAuth,
  (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    if (!SecondLayer.includes(req?.user?.role))
    return res.status(StatusCodes.NON_AUTHORITATIVE_INFORMATION).send(ReasonPhrases.NON_AUTHORITATIVE_INFORMATION);
    return next();
  },
];

 const FirstLayerAuth = [
  (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    if (!FirstLayer.includes(req?.user?.role))
      return res.status(StatusCodes.NON_AUTHORITATIVE_INFORMATION).send(ReasonPhrases.NON_AUTHORITATIVE_INFORMATION);
    return next();
  },
];

export { ThirdLayerAuth, SecondLayerAuth, FirstLayerAuth };
