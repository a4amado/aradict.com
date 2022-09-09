
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';



export async function isAuth(ctx: GetServerSidePropsContext, rank?: number): Promise<object | false> {
  try {
    let user = await getSession(ctx);    
    return user;
  } catch (error) {
    return false;
  }
}

export default isAuth;