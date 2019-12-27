const User = require('../models/user');
const Post = require('../models/post');

module.exports.home = function(req, res){
    // Post.find({}, function(err, posts){
    //     if(err){
    //         console.log("Error in rendering:", err);
    //         return res.redirect('/');
    //     }
    //     return res.render('home', {
    //         allposts: posts,
    //         title: "Home"
    //     }); 
    // }).populate('user');

    Post.find({}).populate('user').sort({createdAt:'desc'}).exec(function(err, posts){
        if(err){
            console.log("Error in rendering:", err);
            return res.redirect('/');
        }
        return res.render('home', {
            allposts: posts,
            title: "Home"
        }); 
    });
}