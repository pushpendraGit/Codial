const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.createPost = async function(req, res){
    
    // User.findById(req.user._id, function(err,user){
    //     if(err){
    //         console.log("Some Error Occured!!! Post not published",err);
    //         return res.redirect('/');
    //     }
    //     Post.create({
    //         content: req.body.content,
    //         user: req.user._id
    //     }, function(err, post){
    //         if(err){
    //             console.log("Error in Publishing Post");
    //             return res.redirect('/');
    //         }
    //         user.posts.push(post);
    //         user.save();
    //         return res.redirect('/');
    //     });
    // });
    try{
        let user = await User.findById(req.user._id);
        let post = await Post.create({
                        content: req.body.content,
                        user: req.user._id
                    });
        user.posts.push(post);
        user.save();
        req.flash('success', 'Post Created Successfully');
        return res.redirect('/');
    }catch(err){
        console.log(err);
        req.flash('error', 'Some Error Ocurred');
        return res.redirect('/');
    }

        
};

module.exports.destroyPost = async function(req,res){
    // Post.findById(req.params.id, function(err, post){
    //     if(post.user == req.user.id){
    //         // let post_id = comment.post;
    //         let user_id = post.user;
    //         post.remove();
    //         Comment.deleteMany({post:req.params.id}, function(err){
    //             if(err){
    //                 console.log("Could Not Delete", err);
    //             }
    //         });
    //         User.findByIdAndUpdate(user_id, {
    //             $pull : {
    //                 posts: req.params.id
    //             }
    //         }, function(err, user){
    //             if(err){
    //                 console.log(err);
    //             }
    //             return res.redirect('/');
    //         });
    //     }else{
    //         return res.redirect('/');
    //     }
    // });
    try{

        
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
        

            let user_id = await  post.user;
            post.remove();
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