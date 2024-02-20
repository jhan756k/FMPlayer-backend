import axios from 'axios';
import mongoose from 'mongoose';
import User from '../models/User';

const userExists = async (access_token: string) => {
  const userData = await axios.get(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`,
  );
  console.log(userData.data);

  const identifier = userData.data.sub;
  const user = await mongoose.model('User').findOne({sub: identifier});

  if (!user) {
    try {
      const newUser = await User.create({
        sub: userData.data.sub,
        email: userData.data.email,
        name: userData.data.name,
        picture: userData.data.picture,
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export default userExists;