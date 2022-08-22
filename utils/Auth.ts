import { StatusCodes, ReasonPhrases, getStatusCode } from 'http-status-codes';
import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';

import { ThirdLayer, SecondLayer, FirstLayer } from "./AuthLayers";
import { NextHandler } from "next-connect";
import { jwtSign, jwtVerify } from './jwt';




const isAuth = async (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
  try {
    const TOKEN  = req.cookies.token;
    const JWT_Secret  = req.cookies.token;
    const  payload = await jwtVerify(TOKEN, JWT_Secret);
    req.user = payload;
    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).send({ msg:  ReasonPhrases.UNAUTHORIZED })
    res.end();
  }
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
