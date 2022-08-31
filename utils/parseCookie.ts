import { NextApiRequest } from 'next';

import { jwtVerify } from './jwt';

const parseCookie = (req: NextApiRequest, cookieName: string = "token") => {
  try {
    const TOKEN = req.cookies.token || "";
    const JWT_Secret = process.env.JWT_SECRET || "";
    console.log("TOKEN", req.cookies);

    const gg = jwtVerify(TOKEN, JWT_Secret);
    return gg;
  } catch (error) {
    console.log(error);

    return false;
  }
};
export default parseCookie;
