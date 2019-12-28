const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.createPost = function(req, res){
    // console.log(req.body);
    User.findById(req.user._id, function(err,user){
        if(err){
            console.log("Some Error Occured!!! Post not published",err);
            return res.redirect('/');
        }
        Post.create({
            content: req.body.content,
            user: req.user._id
        }, function(err, post){
            if(err){
                console.log("Error in Publishing Post");
                return res.redirect('/');
            }
            return res.redirect('/');
        });
    });
}

module.exports.destroyPost = function(req,res){
    Post.findById(req.params.id, function(err, post){
        if(req.user.id==post.user){
            post.remove();
            Comment.deleteMany({post:req.params.id}, function(err){
                if(err){
                    console.log("Could Not Delete", err);
                }
            });
            post.update();
            
        }
    });
    return res.redirect('/');
}