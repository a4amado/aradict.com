import { KeyLike } from 'jose';
import {IncomingMessage} from "http";
declare module 'next' {
  export interface NextApiRequest extends IncomingMessage{
    user?: any
  }
}


declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET:  string
    }
  }
}
export {}