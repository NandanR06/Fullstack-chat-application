import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secretKey = process.env.JWT_SECRET;

//crreatin the jwt token 

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, secretKey ,{
    expiresIn: "1d",
  });
//creating a cookie

  res.cookie('jwt',token,{
    maxAge : 7*24*60*60*1000,
    httpOnly : true,
    sameSite : "strict",
    secure : process.env.NODE_DEV !== 'development'
  })
  return token;
};
