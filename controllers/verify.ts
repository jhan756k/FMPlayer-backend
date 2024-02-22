import {Request, Response} from "express";
import dotenv from "dotenv";
import JWT from "jsonwebtoken";
import axios from 'axios';

dotenv.config();

const verify = async (req: Request, res: Response) => {
  const cookie: string = req.cookies.login;

  if (!cookie) {
    return res.status(401).send("Access Denied");
  }

  try {
    // @ts-ignore
    const verified = JWT.verify(cookie, process.env.JWT_SECRET);
    const ress = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${verified.access_token}`,
    );
    if (ress.status !== 200) {
      res.status(400).send("Invalid Token");
    }
    res.status(200).json({at: verified.access_token});
  } catch {
    res.status(400).send("Invalid Token");
  }
}

export default verify;