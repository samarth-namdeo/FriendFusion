import Post from '../models/Post.js';
import User from '../models/User.js';

// CREATE
export const createPost = async (req, res) => {
    try {
        const {userId , description, picturePath} = req.body;

        const user = await User.findById(userId);

        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            likes: {},
            comments: []
        });
        await newPost.save();
        
        const post = await Post.find(); //grabbing all posts
        res.status(200).json(post);


    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

// READ
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find(); //grabbing all posts
        res.status(200).json(post);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const {userId} = req.params;
        const post = await Post.find({userId}); //grabbing only User's posts
        res.status(200).json(post);

    } catch (error) {
        req.status(404).json({ message: error.message });
    }
}; 

// UPDATE
export const likePosts = async (req, res) => {
    try {
        const {id} = req.params;
        const {userId} = req.body;

        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if(isLiked){
            post.likes.delete(userId);
        }else{
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id, {likes: post.likes}, {new: true}
        )

        res.status(200).json(updatedPost);
        
    } catch (error) {
        req.status(404).json({ message: error.message });
    }
};