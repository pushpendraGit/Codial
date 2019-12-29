const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.createComment = function(req, res){
    
    Post.findById(req.body.post, function(err,post){
       
        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                if(err){
                    console.log("Error in Publishing Comment !!!", err);
                    return res.redirect('back');
                }
                post.comments.push(comment);
                post.save();
                return res.redirect('back');
            });
            req.flash('success', 'Comment Created Successfully');
        }
    });    
};

module.exports.deleteComment = function(req, res){
    console.log(req.params.id);
    Comment.findById(req.params.id, function(err, comment){
        if(comment.user == req.user.id){
            let post_id = comment.post;
            comment.remove();
            Post.findByIdAndUpdate(post_id, {
                $pull : {
                    comments: req.params.id
                }
            }, function(err, comment){
                if(err){
                    console.log(err);
                    req.flash('error', 'Some Error Ocurred');
                    return res.redirect('/');
                }
                req.flash('success', 'Comment Deleted Successfully');
                return res.redirect('/');
            });
        }else{
            req.flash('error', 'Some Error Ocurred');
            return res.redirect('/');
        }
    });
}