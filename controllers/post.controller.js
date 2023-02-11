const Post = require('../database/modules/Post');
const User = require('../database/modules/User');

const post = {

    async get(req ,res){

        try {
            
            const posts = await Post.find({}).populate('user Likes' ,{password:0}).sort({createdAt:-1});

            res.status(200).send(posts);
        } catch (error) {
            
            console.log("error in getting posts");
            res.status(404).send(error.message);
        }
    },

    async getById(req ,res){

        const {id} = req.params;

        try {
            
            const post = await Post.findOne({_id:id})
            .populate('comments.user user Likes' ,{password:0 ,friends:0 ,Posts:0 ,SavedPosts:0})
            .sort({"comments.createdAt":-1});

            res.status(200).send(post);
        } catch (error) {
            
            console.log("error in getting posts");
            res.status(404).send(error.message);
        }
    },

    async create(req ,res){

        try {
            
            
            const {user_id ,description ,image} = req.body;

            const user = await User.findOne({
                _id:user_id
            })

            const newPost = await Post.create({
                user,
                description,
                image
            })

            const post = await Post.findOne({_id:newPost._id}).populate('comments.user user Likes' ,{password:0 ,friends:0 ,Posts:0 ,SavedPosts:0});
            // add to user
            const update = await User.updateOne({
                _id:user_id
            } ,{
                $push:{
                    Posts:newPost
                }
            })
 
            res.status(200).send(post);

        } catch (error) {
            
            console.log("unable to post");
            res.status(400).send(error.message);
        }
    },

    async delete(req,res){

        try {
            const {id} = req.params;
            const response = await Post.deleteOne({
                _id:id
            })

            res.status(200).send("deleted successfully");
            
        } catch (error) {

            console.log("error in deleting the post");
            res.status(402).json({
                status:"failure",
                message:"deleting a post failed",
                error:error.message
            })

        }
    },

    async addComment(req ,res){

        const {user_id ,post_id ,comment} = req.body;

        
        const user = await User.findOne({
            _id:user_id
        })

        try {

            const status = await Post.updateOne({
                _id:post_id
            } ,{
                $push:{
                    comments:{
                        user,
                        comment
                    }
                }
            })

            res.status(200).send({
                user,
                comment
            });

        } catch (error) {
            
            console.log("error in adding comment !!");
            res.status(402).json({
                status:"failure",
                message:"adding comment to post failed",
                error:error.message
            })
        }
    } ,

    async addLike(req ,res){

        
        const {user_id ,post_id} = req.body;

        try {
            const user = await User.findOne({
                _id:user_id
            })
          
            const status = await Post.updateOne({
                _id:post_id
            } ,{
                $addToSet:{
                    Likes:user
                }
            })

            res.status(200).send("Like added successfully !!");

        } catch (error) {
     
            res.status(402).json({
                status:"failure",
                message:"like to a post failed",
                error:error.message
            })

        }
    } ,

    async removeLike(req ,res){

        const {user_id ,post_id} = req.body;
        try {

            const user = await User.findOne({
                _id:user_id
            })

            const status = await Post.updateOne({
                _id:post_id
            },{
                $pull:{
                    Likes:user._id
                }
            })

            res.status(200).json({
                status:"success",
                message:"disliked a post (passed)"
            })
        } catch (error) {
            
            res.status(402).json({
                status:"failuare",
                message:"disliked a post (failed)",
                error:error.message
            })

        }
    } ,

    async savePost (req ,res){

        const {user_id ,post_id} = req.body;

        try {
            const post = await Post.findOne({
                _id:post_id
            })

            const update = await User.updateOne({
                _id:user_id
            },{
                $addToSet:{
                    SavedPosts:post
                }
            })

            res.status(200).json({
                status:"success",
                message:"saved a post "
            })
            
        } catch (error) {
            
            res.status(402).json({
                status:"failure",
                message:"saving a post (failed)",
                error:error.message
            })
        }
    }
}

module.exports = post;