const User = require('../models/user');
const Post = require('../models/post');

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