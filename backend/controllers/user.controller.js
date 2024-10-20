import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



// user register with details
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      // check user give info or not
      return res.status(401).json({
        message: "Something went wrong, check your information!",
        success: false,
      });
    }
    // if email is Alredy exist then the show sms
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "email Alredy exist",
        success: false,
      });
    }
    // if user email not exist then able to login
    // use hashed for store password different formate
    // bcrypt is conver password one to another form
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      email,
      password: hashedPassword,
    });
    // return sms
    return res.status(201).json({
      message: "create account successfully!",
      success: true,
    });
  } catch (error) {
    console.log("register", error);
  }
};


// user login with eamil and Password
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      // check valied both but not then return sms
      return res.status(401).json({
        message: "check your email & password, try again!",
        success: false,
      });
    }
    // check eamil
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "check your Email or Password!",
        success: false,
      });
    }
    // ispasswordMatch check your password and compare in database matched match or not
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "check your Email or Password!",
        success: false,
      });
    }

    // store in frontend
    user ={
    _id:user._id,
    username: user.username,
    email: user.email,    
    profilepicture: user.profilePicture,
    bio: user.bio,
    followers: user.followers,
    following: user.following,
    posts: user.posts,
    } 

    // use toke for security youPassword hacker not get
    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "id",
    });
    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 61 * 60 * 1000,
      })
      .json({
        message: `Welcome back ${user.username}`,
        success: true,
        user
      });
  } catch (error) {
    console.log("login error", error);
  }
};


// logout when user want
export const logout = async (req, res) => {
    try {
        return res.cookie('token', '', {maxAge: 0}).json({
            message: 'Logged out successfully.',
            success:true
        });
    } catch (error) {
        console.log(error);
        
    }
}


// for Profile 
export const getProfile = async (req, res) =>{
    try {
        const userId = req.params.id;
        let user = await User.findById(userId);
        return res.status(200).json({
            user, 
            success:true
        }); 
    } catch (error) {
        console.log(error);
        
    }
};


// for edit Profile



