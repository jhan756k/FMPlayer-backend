import axios from 'axios';
import User from '../models/User';
import dotenv from "dotenv";
import generateJWT from "./generateJWT";

dotenv.config();

const checkUser = async (access_token: string) => {
  const userData = await axios.get(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`,
  );

  const user = await User.findOne({subId: userData.data.sub});

  if (!user) {
    try {
      const newUser = await User.create({
        subId: userData.data.sub,
        email: userData.data.email,
        name: userData.data.name,
        picture: userData.data.picture,
      });
      return generateJWT(newUser, access_token);

    } catch (err) {
      console.log("error in creating user");
      return "fail";
    }
  } else {
    console.log("user already exists");
    return generateJWT(user, access_token);
  }
}

export default checkUser;