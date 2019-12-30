const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.createPost = async function(req, res){
    try{
        let user = await User.findById(req.user._id);
        let post = await Post.create({
                        content: req.body.content,
                        user: req.user._id
                    });
        user.posts.push(post);
        user.save();

        if(req.xhr){
            return res.status(200).json({
                data:{
                    post: post
                },
                message: "Post Created !!!"
            });
        }

        req.flash('success', 'Post Created Successfully');
        return res.redirect('/');
    }catch(err){
        console.log(err);
        req.flash('error', 'Some Error Ocurred');
        return res.redirect('/');
    }

        
};

module.exports.destroyPost = async function(req,res){
    try{        
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
        

            let user_id = await  post.user;
            post.remove();

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id : req.params.id
                    },
                    message:"Post Deleted"
                })
            }
            Comment.deleteMany({post:req.params.id}, function(err){
                if(err){
                    console.log("Could Not Delete", err);
                }
            });
            let user = await User.findByIdAndUpdate(user_id, {
                    $pull : {
                        posts: req.params.id
                    }
            });
            req.flash('success', 'Post Deleted Successfully');
        }
        return res.redirect('/');
    }catch(err){
        console.log(err);
        req.flash('error', 'Some Error Ocurred');
        return res.redirect('/');
    }

}