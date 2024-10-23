import sharp from "sharp";
import cloudinary from "../utils/cloudinary.js"
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import Comment from "../models/comment.model.js";

// add new posts
export const addNewPost = async (req, res) => {
    try {
        const {caption} = req.body;
        const image = req.file;
        const autherId = req.id;

        if(!image){ // check the image is not found
            return res.status(400).json({message:'Image required'})
        }

        // image uplode
        const otimizedImageBuffer = await sharp(image.buffer).resize({with:800, height:800, fit:'inside'}).toFormat('jpeg', {quality: '80'})
        .toBuffer();
        
        // convert image buffer to uri 
        const fileUri = `data:image/jpeg;base64,${otimizedImageBuffer.toString("base64")}`;
        const cloudResponse = await cloudinary.uplader.upload(fileUri);
        const post = await Post.creat({
            caption,                  // something write with post in caption 
            image: cloudResponse.url,   // get url from clodinart
            author:autherId,            // take author id
        });
        const user = await User.findById(autherId);
         if(user){
            user.post.push(post._id);
            await user.save();
         }

         await post.populate({push:'auther', select: '-password'});

         return res.status(200).json({
            message:"New Post uploded successfully",
            post,
            success:true,
         })



    } catch (error) {
        console.log(error);
        
    }
}

// for store all post
export const getAllPost = async (req, res) =>{
    try {
        const posts = await Post.find().sort({createdAt:-1})//-1 img lik insta 
        .populate({path:'author', select: 'username, profilePicture'})// user ki  profilePicture bs dikhe gi
        .populate({ // ap ki post pr koi comment krta hai to 
            path:'comments',
            sort:{createdAt:-1},
            populate:{ // who one comment on your post
                path: 'author',
                select: 'username, profilePicture'
            }
        });
        return res.status(200).json({
            posts,
            success:true,
        })

    } catch (error) {
        console.log(error);
        
    }
}

// only for user post giv the all information about userPost
export const getUserPost = async (req, res) => {
    try {
        
        const authorId = req.id;
        const posts = await Post.find({author: authorId})
            .sort({createdAt: -1})
            .populate({
                path:'auther',
                select:'username, profilePicture'
            }).populate({
                path:'cpmments',
                sort:{createdAt: -1},
                populate:{
                    path:'auther', 
                    select: 'username, profilePicture'
                }
            })
            return res.status(200).json({
                posts,
                success:true
            })

    } catch (error) {
        console.log(error);
        
    }
}

// for like post for any image 
export const likePost = async (req, res) => {
    try {
        // post not ableble
        const likeKrneWaleKiUserId = res.id;
        const postId = req.params.id; //get the id who like
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({
                message: 'post not found',
                success: false,
            })
        }
        
        // post found
        await post.updateOne({ $addToSet: { likes: likeKrneWaleKiUserId } })// addToSet give permission to like any image one time
        await post.save();

       // add socket io for real time notification after complete bc i do
       
       return res.status(200).json({message: 'post liked', success:true});

    } catch (error) {
        console.log(error);
        
    }
}


// for Comment post for any image 
export const dislikePost = async (req, res) => {
    try {
        // post not ableble
        const likeKrneWaleKiUserId = res.id;
        const postId = req.params.id; //get the id who like
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({
                message: 'post not found',
                success: false,
            })
        }
        
        // post found
        await post.updateOne({ $pull:  { likes: likeKrneWaleKiUserId } })// addToSet give permission to like any image one time
        await post.save();

       // add socket io for real time notification after complete bc i do
       
       return res.status(200).json({message: 'post diliked', success:true});

    } catch (error) {
        console.log(error);
        
    }
}

// add comments 
export const addComment = async (req, res) =>{
   try {
    const postId = req.params.id;
    const commentManId = req.id;
    const text = req.body;
    const post = await Post.findById(postId);
    if(!text){
        return res.status(400).json({
            message:'text is must',
            success: false,
        })
    }
    const comment = await Comment.creat({
        text,
        author: commentManId,
        post: postId,
    }).populate({
        path:'author',
        select: 'username, profilePicture'
    });
    post.comments.push(comment._id);
    await post.save(); 

    return res.status(201).json({
        message:'Comment Added', 
        comment, 
        success: true,
    })
    
   } catch (error) {
    console.log(error);
    
   }
};


// comment according to different posts
export const getCommentPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const comments = await Comment.find({post:postId})
        .populate('author', 'username, profilePicture');// method allows you to reference documents in other collections. 
        if(!comments){
            return res.status(404).json({ 
                message:'No fount comment in this post',
                success: false
            })
        }
        // if u get comment
        return res.status(200).json({
            success: true,
            comments,
        })


    } catch (error) {
        console.log(error);
        
    }
}

// let's user wants to delete tha comment give by it self
export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const authorId = req.id;
        
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({
                message: 'post not fount',
                success: false,
            })
        }
        // check if the logedin user is the owner of the post
        if (post.author.toString() !== authorId){
            return res.status(403).json({
                message:'User unAutherized',
                success:false,
            })
        }
        // delete the post 
        await Post.findByIdDelete(postId);

        // remove the post id from the user's post
        let user = await User.findById(authorId);
        user.posts = user.posts.filter(id => id.String() !== postId);
        await user.save();

        // deleted associated comment if u delete post then also deleted comments at that post
        await Comment.deleteMany({post:postId});

        return res.status(202).json({
            message:' Post deleted successfully',
            success: true,
        })



    } catch (error) {
        console.log(error);
        
    }
}

// Post bookmark by user
export const postBookmark = async (req, res) => {
    try {
        const postId = req.params.id;
        const authorId = req.id;
        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({message: 'post not fount', success: false})
        }

        const user = await User.findById(authorId);
        if (user.bookmarks.included(post._id)) {
            // if your post alredy bookmarks then remove
            await user.updateOne({$pull:{bookmarks:post._id}});
            await user.save();
            return res.status(200).json({
                type:unsaved,
                message:'Post bookmarks removed',
                success:true});
        }else{
            // book marks here
            await user.updateOne({$addToSet:{bookmarks:post._id}});
            await user.save();
            return res.status(200).json({
                type: saved,
                message:' Post bookmarked',
                success:true});
        }


    } catch (error) {
        console.log(error);
        
    }
}