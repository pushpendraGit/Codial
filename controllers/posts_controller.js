const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');
var fs = require('fs');
const path = require('path');

module.exports.createPost = function(req, res){
        Post.uploadedPic(req, res, function(err){
            if(req.fileValidationError) {
                console.log("MULTER ERROR");
                req.flash('error', 'Only image files can be uploaded');
                return res.redirect('/');
                // return res.end(req.fileValidationError);
            }
            if(err||req.files[5]){
                req.flash('error', 'More than 5 files cannot be uploaded!!!');
                // console.log(err);
                return res.redirect('back');  
            }else{
                
                var picarr = [];
                for(var i = 0; i<5; i++){
                    if(req.files[i]){                        
                        picarr[i] = Post.picPath + '/' + req.files[i].filename;
                    }else{  
                        break;            
                    }
                }
                
                let abc = async function(){
                    let user = await User.findById(req.user._id);
                    let post = await Post.create({
                        content : req.body.content,
                        user : req.user._id,  
                        uploadPic : picarr                   
                    });
                    post = await post.populate('user', 'name email').execPopulate();
                    user.posts.push(post);
                    user.save();
                };
                abc();
                req.flash('success', 'Post Created Successfully');
               
                return res.redirect('back');
            }

        
        });
};    
        
        
        
        // let user = await User.findById(req.user._id);
        // let post = await Post.create({
        //                 content: req.body.content,
        //                 user: req.user._id
        //             });
        // user.posts.push(post);
        // user.save();

        
        // req.flash('success', 'Post Created Successfully');
        // return res.redirect('/');        







        // if(req.xhr){
        //     return res.status(200).json({
        //         data:{
        //             post: post
        //         },
        //         message: "Post Created !!!"
        //     });
        // }




module.exports.destroyPost = async function(req,res){
    try{        
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            
            if(post.uploadPic[0]){
                for(var i=0; i<5; i++){
                    if(post.uploadPic[i]){
                        var filePath = path.join(__dirname, '..', post.uploadPic[i]);
                        fs.unlinkSync(filePath);
                    }else{
                        break;
                    }
                }
            }

            await Like.deleteMany({
                likedObjId:post._id, 
                onModel:'Post'
            });

            // await Like.deleteMany({
            //    _id: {
            //        $in: post.comments
            //    }
            // });
            var i=0;
            while(post.comments[i]){
                console.log(post.comments[i]);
                await Like.deleteOne({
                    likedObjId: post.comments[i]
                })
                i++;
            }
            // console.log(post.comments[0]);
            // await Like.deleteMany({_id: {$in: post.comments}});

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
};

            // if(req.xhr){
            //     return res.status(200).json({
            //         data: {
            //             post_id : req.params.id
            //         },
            //         message:"Post Deleted"
            //     })
            // }