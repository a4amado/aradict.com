import { unstable_getServerSession } from 'next-auth';
import { GetServerSidePropsContext } from 'next';
import { authOptions } from "../pages/api/auth/[...nextauth]";


export async function isAuth(ctx: GetServerSidePropsContext, rank: number): Promise<object | false> {
  try {
    let user = await unstable_getServerSession(ctx.req, ctx.res, authOptions);
    
    // Rank === Infinity -> Page is Public
    if (rank === Infinity || !user) return user || false;
    if (!(user?.rank <= rank)) return false;
    return user;
  } catch (error) {
    return false;
  }
}

export default isAuth;