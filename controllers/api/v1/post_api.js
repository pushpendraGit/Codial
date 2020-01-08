const Post = require('../../../models/post');
const Like = require('../../../models/like');
const User = require('../../../models/user');
const Comment = require('../../../models/comment');

module.exports.index = async function(req, res){
    try{
        let posts = await Post.find({})
                .populate({
                    path: 'user',
                    model: 'User',
                    select: {
                        password:0
                    }
                })
                .populate({
                    path : 'comments',
                    populate : {
                        path : 'user',
                        model : 'User',
                        select: {
                            password:0
                        }
                    }
                })
                .sort({createdAt: 'descending'});

        // let users = await User.find({});
        // return res.render('home', {
        //     allposts: posts,
        //     allusers: users,
        //     title: "Codeial | Home"
        // }); 

        return res.json(200,{
            allposts : posts,
            message : "Posts Loaded"
        })

    }catch(err){
        console.log(err);
        return res.redirect('/');
    }
    
}




module.exports.destroyPost = async function(req,res){
    try{        
        let post = await Post.findById(req.params.id);            
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
            var i=0;
            while(post.comments[i]){
                console.log(post.comments[i]);
                await Like.deleteOne({
                    likedObjId: post.comments[i]
                })
                i++;
            }

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
            return res.json(200, {
                message: "Deleted"
            })
           
    }catch(err){
        console.log(err);
        // req.flash('error', 'Some Error Ocurred');
        return res.redirect('/');
    }
};