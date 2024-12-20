import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDatauri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import Post from "../models/post.model.js";

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
    // ispasswordMatch check your password match and compare in database matched match or not
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "check your Email or Password!",
        success: false,
      });
    }
    // use toke for security youPassword hacker not get
    const token = await jwt.sign({ userId:user._id },process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // populate each post  if in posts array
    const populatedPosts = await Promise.all(
      user.posts.map(async (postId) => {
        const post = await Post.findById(postId);
        if (post.author.equals(user._id)) {
          return post;
        }
        return null;
      })
    );
    // Filter out null posts
     const validPosts = populatedPosts.filter((post) => post !== null);

    // store in frontend
    user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      posts: populatedPosts,
      // posts: user.posts
    };

    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 61 * 60 * 1000,// 1day
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
    return res.cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// for Profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    let user = await User.findById(userId).select("-password");
    return res.status(200).json({
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// for edit editProfile
export const editProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { bio, gender } = req.body;
    const profilePicture = req.file;
    let cloudResponse;
  // Handle profile picture uploade
    if (profilePicture) {
      const fileUri = getDatauri(profilePicture);
      cloudResponse = await cloudinary.v2.uploader.upload(fileUri);
    }
    // that user we want to update (-password for egnore)
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (bio) user.bio = bio;
    if (gender) user.gender = gender;
    if (profilePicture) user.profilePicture = cloudResponse.secure_url;

    await user.save();

    return res.status(202).json({
      message: "editProfile successfully",
      success: true,
      user, // update user
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while updating the profile",
      success: false,
      error: error.message,
    });
  }
};

// suggested user r u want to follow then follow them
export const getSuggestedUsers = async (req, res) => {
  try {
    const suggestedUsers = await User.find({ _id: { $ne: req.id } }).select(
      "-password"
    );
    if (!suggestedUsers) {
      return res.status(400).json({
        message: "Currently do not any users",
      });
    }
    return res.status(200).json({
      success: true,
      users: suggestedUsers,
    });
  } catch (error) {
    console.log(error);
  }
};

// followers and following
export const followingOrFolloers = async (req, res) => {
  try {
    const follow = req.id; // Your ID
    const followings = req.params.id; // The ID of the user to follow or unfollow

    if (follow === followings) {
      return res.status(400).json({
        massage: "You are not able to follow/Unfollow it self!",
        success: false,
      });
    }

    const user = await User.findById(follow); // jisko follow kruga
    const targetUser = await User.findById(followings); // jisako follow kiya
    // check here ki y mera phele se hi to follower/ following to nhi hai
    if (!user || !targetUser) {
      return res.status(400).json({
        massage: "User not found",
        success: false,
      });
    }

    // may i check whether to follow or not
    const isFollowing = user.following.includes(followings);
    if (isFollowing) {
      // unfollow
      await Promise.all([
        User.updateOne({ _id: follow }, { $pull: { following: followings } }), // unfollow krne wala jisko unfollow kiya gya
        User.updateOne({ _id: followings }, { $pull: { follower: follow } }), // mere following me aur samane wake ke follow
      ]);
      return res.status(200).json({
        message: "Unfollowed Successfully!",
        success: true,
      });
    } else {
      // follow
      await Promise.all([
        User.updateOne({ _id: follow }, { $push: { following: followings } }), // follow krne wala jisko follow kiya gya
        User.updateOne({ _id: followings }, { $push: { follower: follow } }), // mere following me aur samane wake ke follow
      ]);
      return res.status(200).json({
        message: "followed Successfully!",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
