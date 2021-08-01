import * as jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET_KEY ?? "";

export const generateToken: Function = (
  payload: Object,
  expiresIn: string | number | undefined
): String => {
  return jwt.sign(payload, jwtSecret, {
    expiresIn: expiresIn, // 만료일 5분
  });
};

export const verifyToken: Function = (token: string): Object => {
  return jwt.verify(token, jwtSecret);
};
