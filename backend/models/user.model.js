import mongoose from "mongoose";

const userSchema = new mongoose.Schema( // creat userInformation
  {
    username: {
      // about name
      type: String,
      required: true,
      unique: true,
    },
    email: {
      // about eamil
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilepicture: {
      // uplode for profile picture
      type: String,
      default: "",
    },
    bio: {
      // about detail information
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId, // for data other modles
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId, // for data other modles
        ref: "User",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId, // for data other modles
        ref: "Post",
      },
    ],
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId, // for data other modles
        ref: "Post",
      },
    ],
  },
  { timestamps: true } // for creatAt date , updateAt Date
);
export const User = mongoose.model("User", userSchema); // export r u want to othet place
