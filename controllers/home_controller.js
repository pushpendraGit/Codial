const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.home = async function(req, res){
    
    try{
        let posts = await Post.find({})
                .populate('user')
                .populate({
                    path : 'comments',
                    populate : {
                        path : 'user'
                    }
                })
                .sort({createdAt: 'descending'});
        let users = await User.find({});
        return res.render('home', {
            allposts: posts,
            allusers: users,
            title: "Codeial | Home"
        }); 
    }catch(err){
        console.log(err)
    }
    
}