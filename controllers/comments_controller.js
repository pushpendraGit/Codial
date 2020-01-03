const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');
const commentMailer = require('../mailers/comments-mailer');

module.exports.createComment = async function(req, res){
    
    // Post.findById(req.body.post, function(err,post){
       
    //     if(post){

    //         Comment.create({
    //             content: req.body.content,
    //             post: req.body.post,
    //             user: req.user._id
    //         }, function(err, comment){
    //             if(err){
    //                 console.log("Error in Publishing Comment !!!", err);
    //                 return res.redirect('back');
    //             }
    //             post.comments.push(comment);
    //             post.save();
                
    //             commentMailer.newComment(comment);
    //             return res.redirect('back');
    //         })
    //         req.flash('success', 'Comment Created Successfully');
    //     }
    // });   
    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                            content: req.body.content,
                            post: req.body.post,
                            user: req.user._id
                        });
            post.comments.push(comment);
            post.save();
            comment = await comment.populate('user', 'name email').execPopulate();
            post = await post.populate('user', 'email').execPopulate();

            commentMailer.newComment(comment);
            commentMailer.newCommentPost(comment, post);

            req.flash('success', 'Comment Created Successfully');
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }
       
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