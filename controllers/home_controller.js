const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.home = function(req, res){
    

    Post.find({})
    .populate('user')
    .populate({
        path : 'comments',
        populate : {
            path : 'user'
        }
    })
    .exec(function(err, posts){
        if(err){
            console.log("Error in rendering:", err);
            return res.redirect('/');
        }
        User.find({}, function(err, users){
            return res.render('home', {
                allposts: posts,
                allusers: users,
                title: "Home"
            }); 
        });
    });


}