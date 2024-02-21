import {Request, Response} from "express";
import dotenv from "dotenv";

dotenv.config();

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
const url = `${GOOGLE_AUTH_URL}?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_AUTH_REDIRECT_URL}&response_type=code&include_granted_scopes=true&access_type=offline&prompt=consent&scope=https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/userinfo.email`
const googleRedir = (req: Request, res: Response) => {
  return res.redirect(url);
}

export default googleRedir;