const User = require('../models/user');
const Post = require('../models/post');

module.exports.profile = function(req, res){
//   User.findById(req.params.id, function(err,user){
    // console.log(user.posts);
//     return res.render('user_profile', {
//         title: 'User Profile',
//         profile : user,
        
//     });
//   });
    

    // User.findById(req.params.id)
    // .populate('Post')
    // .exec(
    //     function(err,user){
    //             console.log(user.posts);
    //             return res.render('user_profile', {
    //                 title: 'User Profile',
    //                 profile : user,
    //                 myposts : user.posts
    //             });
    //           }
    // )
    User.findById(req.params.id)
    .populate('posts')
    .populate({
        path : 'comments',
        populate : {
            path : 'user'
        }
    })
    .exec(function(err, user){
        Post.find({user: user}, function(err, posts){
            // console.log(po)
            return res.render('user_profile', {
                title: 'User Profile',
                profile : user,
                myposts : posts
            });
        });
    });
};

module.exports.update = function(req, res){
    console.log(req.params, req.body);
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,{
            email : req.body.email,
            name : req.body.name
        } ,function(err, user){
            if(err){
                console.log("ERRORRRRRR");
                req.flash('error', 'Some Error Ocurred');
                return res.redirect('back');
            }
        });
        req.flash('success', 'Profile Updated Successfully');
        return res.redirect('back');   
    }
};

// render the sign up page
module.exports.signUp = function(req, res){   
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('error in finding user in signing up');
            return res.redirect('/');
        }

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged In Successfully');
    return res.redirect('/');
}

module.exports.signOut = function(req, res){
    
    req.flash('success', 'Logged Out Successfully');
    req.logout();
    return res.redirect('/');
}