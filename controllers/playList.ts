import {Request, Response} from 'express';
import axios from 'axios';

const playList = async (res: Response, req: Request) => {
  console.log(req.cookies);
  // const playlists = await axios.get(
  //   `https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true&access_token=${at}`,
  // );
  // console.log(playlists);
  // res.status(200).send(playlists);
}

export default playList;