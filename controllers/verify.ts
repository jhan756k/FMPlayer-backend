import {Request, Response} from "express";
import dotenv from "dotenv";
import JWT from "jsonwebtoken";

dotenv.config();

const verify = async (req: Request, res: Response) => {
  const cookie: string = req.cookies.login;
  if (!cookie) {
    return res.status(401).send("Access Denied");
  }

  try {
    // @ts-ignore
    const verified = JWT.verify(cookie, process.env.JWT_SECRET);
    res.status(200).json({at: verified.access_token});
  } catch {
    res.status(400).send("Invalid Token");
  }
}

export default verify;