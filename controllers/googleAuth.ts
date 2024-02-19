import {NextFunction, Request, Response} from 'express';
import axios from 'axios';

const GOOGLE_AUTH_TOKEN_URL = "https://oauth2.googleapis.com/token"

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
        return;
      }
    );

  const access_token = data['access_token'];

  const playlists = await axios.get(
    `https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true&access_token=${access_token}`,
  );

  console.log(playlists.data.items);

  return res.redirect('http://localhost:3000');
}

export default googleAuth;