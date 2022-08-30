import { sign, verify, JwtPayload } from "jsonwebtoken";

export function jwtVerify(token: string, secret: string): JwtPayload {
  try {
    let gg : any = verify(token, secret);
    console.log(gg);
    
    return gg;
  } catch (error) {
    console.log(error);
    return {};
  }
}

export function jwtSign(data: any, secret: string) {
  try {
    const gg  = sign(data, secret, { expiresIn: "2h" });
    return gg;
  } catch (error) {
    console.log(error);
    return "";
  }
}
