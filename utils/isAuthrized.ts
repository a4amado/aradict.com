import { getToken, decode } from 'next-auth/jwt';
import { GetServerSidePropsContext } from 'next';
import { authOptions } from "../pages/api/auth/[...nextauth]";


export async function isAuth(ctx: GetServerSidePropsContext, rank?: number): Promise<object | false> {
  try {
    let user = await getToken({ req: ctx.req, secret: process.env.JWT_SECRET });
    
    return user;
  } catch (error) {
    return false;
  }
}

export default isAuth;