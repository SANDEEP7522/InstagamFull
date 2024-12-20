import mongoose from "mongoose";

const postSchema = new mongoose.Schema( // for post information
  {
    caption: {
      // write something below your image
      type: String,
      default: "",
    },
    image: {
      // post image it's important
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

 const Post = mongoose.model("Post", postSchema);
export default Post;