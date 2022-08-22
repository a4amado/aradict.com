import { sign, verify } from "jsonwebtoken";



export async function jwtVerify(token: string, secret: string): Promise<any> {
    return new Promise((resolve, reject) => {
      verify(token, secret, (err, decoded) => {
        if (err) return reject(err);
        resolve(decoded);
      });
    });
}



export async function jwtSign(data: any, secret: string): Promise<any> {
    return new Promise((resolve, reject) => {
      sign(data, secret, (err, decoded) => {
        if (err) return reject(err);
        resolve(decoded);
      });
    });
}