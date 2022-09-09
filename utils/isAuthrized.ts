
import { GetServerSidePropsContext } from 'next';
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from '../pages/api/auth/[...nextauth]';



export async function isAuth(ctx: GetServerSidePropsContext): Promise<object | false> {
  try {

    let user = await unstable_getServerSession(ctx.req, ctx.res, authOptions);
    console.log(user);
    
    return user;
  } catch (error) {
    return false;
  }
}

export default isAuth;