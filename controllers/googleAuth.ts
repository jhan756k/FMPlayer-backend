import {NextFunction, Request, Response} from 'express';
import checkUser from "../tools/checkUser";
import axios from 'axios';

const GOOGLE_AUTH_TOKEN_URL = "https://oauth2.googleapis.com/token";

const googleAuth = async (req: Request, res: Response, next: NextFunction) => {
  const code = req.query.code;
  // @ts-ignore
  const {data} = await axios({
    method: 'POST',
    url: `${GOOGLE_AUTH_TOKEN_URL}`,
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    params: {
      grant_type: 'authorization_code',
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_SECRET_ID,
      redirectUri: process.env.GOOGLE_AUTH_REDIRECT_URL,
      code: code,
    }
  })
    .catch((err) => {
        console.log(err);
      }
    );

  const access_token = data['access_token'];
  const check = await checkUser(access_token);
  const refresh_token = data['refresh_token'];


  if (check !== "fail") {
    res.cookie('login', check, {httpOnly: true});
  } else {
    return res.status(400).send("Failed to authenticate");
  }
  res.redirect('http://localhost:3000');
}

export default googleAuth;