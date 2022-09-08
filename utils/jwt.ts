import { JwtPayload, sign, verify } from 'jsonwebtoken';

export function jwtVerify(token: string, secret: string): JwtPayload {
  try {
    let gg : any = verify(token, secret);    
    return gg;
  } catch (error) {
    return {};
  }
}

export function jwtSign(data: any, secret: string) {
  try {
    const gg  = sign(data, secret, { expiresIn: "2h" });
    return gg;
  } catch (error) {

    return "";
  }
}
