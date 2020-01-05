const Like = require('../models/like');
const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.toggleLike = async function(req,res){
    try{
        
        let likedObjId;
        let deleted = false;

        if(req.query.type == 'Post'){
            likedObjId = await Post.findById(req.query.id).populate('likes');
        }else if(req.query.type == 'Comment'){
            likedObjId = await Comment.findById(req.query.id).populate('likes');
        }else{
            req.flash('error', "Don't Fiddle with our code");
            return res.redirect('/');
        }

        let existingLike = await Like.findOne({
            likedObjId : req.query.id,
            onModel : req.query.type,
            user: req.user._id
        });
        // console.log(existingLike);

        if(existingLike){
            likedObjId.likes.pull(existingLike._id);
            likedObjId.save();

            existingLike.remove();
            req.flash('success', 'Like successfully removed');
            deleted = true;
        }else{
            let newLike = await Like.create({
                user: req.user._id,
                onModel : req.query.type,
                likedObjId: req.query.id
            });
            likedObjId.likes.push(newLike._id);
            likedObjId.save();
            req.flash('success', 'You Liked');
        }

        
        return res.redirect('/');      
    }catch(err){
        console.log(err);
        req.flash('error', 'Some Error Ocurred');
        return res.redirect('/');
    }
};