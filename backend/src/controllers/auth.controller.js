import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/token.js";
import cloudinary from "../lib/cloudinary.js";

//--------------------------auth signup-----------------------------------//
export const signup = async (req, res) => {
  const { email, password, fullName } = req.body;
  try {
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters long" });
    }
    const user = await User.findOne({ email });

    // validate if user already exists
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // creating hashpassword
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new User({
      fullName,
      email,
      password: hashPassword,
    });

    if (newUser) {
      // jwt token
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        password: newUser.password,
        email: newUser.email,
        profilePic: newUser.profilepic,
      });
    } else {
      res.status(400).json({ message: "invalid user data" });
    }
  } catch (error) {
    console.log(`error in signup controler :  ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

// --------------------------------- auth login -----------------------------------------------//

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "invalid credentials data" });
    }
    const isPasswordCurret = await bcrypt.compare(password, user.password);

    if (!isPasswordCurret) {
      return res.status(400).json({ message: "invalid credentials pass" });
    }

    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      password: user.password,
      email: user.email,
      profilePic: user.profilepic,
    });
  } catch (error) {
    console.log("error in login controler ", error.message);
    return res.status(400).json({ message: error.message });
  }
};

// --------------------------------- auth logout ----------------------------------------------//
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    console.log("error in logout controler ", error.message);
    return res.status(400).json({ message: error.message });
  }
};

//------------------------------------update the profile------------------------------------//

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    if (!profilePic) {
      return res.status(400).json({ message: "profilePic is required" });
    }

    // uploading the pic to cloudinary
    const updatsdResponse = await cloudinary.uploader.upload(profilePic);
    const updatdUserProfile = await User.findByIdAndUpdate(
      req.user._id,
      { profilepic: updatsdResponse.secure_url },
      { new: true }
    );
    res.status(200).json({
      profilePic: updatdUserProfile.profilepic,
    });
  } catch (error) {
    console.log("error in updateProfile controler  :", " Image is too larg");
    return res.status(400).json({ message: " Image is too large" });
  }
};

// --------------------------------- check the user ----------------------------------------------//

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("error in checkAuth controler  ", error.message);
    return res.status(500).json({ message: error.message });
  }
};
