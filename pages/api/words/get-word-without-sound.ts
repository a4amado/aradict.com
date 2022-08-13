import next, { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import nextConnect, { NextHandler } from "next-connect";
import { FirstLayerAuth } from "../../../utils/Auth";


interface ThrownError {
    name: string,
    code: number
}


class NextError {
    name:string
    code:number
    constructor(code: number, name: string) {
        this.name = name;
        this.code = code
    }
}

const route = nextConnect({
  onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
    res.status(404).send("Not Found");
  },
  onError: (err: ThrownError, req: NextApiRequest, res: NextApiResponse) => {

    res.status(err.code).send({ error: err.name });
  },
});

import prisma from "../../../DB";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import HTTPError from "http-errors";

route.use(...FirstLayerAuth);

route.get(async (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
  try {
    const word = await prisma.words.findFirst({
      where: { sounds: { none: {} } },
    })

    if (!word) return next(HTTPError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND));
    return res.status(StatusCodes.OK).send({ word });

  } catch (e) {

  }
});

export default route;
