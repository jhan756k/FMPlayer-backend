import JWT from "jsonwebtoken";

const generateJWT = async (user: any, access_token: string) => {
  const payload = {
    subId: user.subId,
    email: user.email,
    name: user.name,
    picture: user.picture,
    access_token: access_token,
  }

  // @ts-ignore
  const key: string = process.env.JWT_SECRET;
  return JWT.sign(payload, key, {expiresIn: '30d'});
}

export default generateJWT;