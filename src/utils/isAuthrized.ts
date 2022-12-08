
import { GetServerSidePropsContext } from 'next';
import { unstable_getServerSession, Session } from "next-auth"
import { authOptions } from '../pages/api/auth/[...nextauth]';



export async function isAuth(ctx: GetServerSidePropsContext): Promise<Session | false> {
  try {

    let user = await unstable_getServerSession(ctx.req, ctx.res, authOptions);
    if (!user) return false;

    return user;
  } catch (error) {
    return false;
  }
}

export default isAuth;