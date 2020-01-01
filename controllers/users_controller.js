const User = require('../models/user');
const Post = require('../models/post');
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req, res){
    User.findById(req.params.id)
    .populate('posts')
    // .populate({
    //     path : 'comments',
    //     populate : {
    //         path : 'user'
    //     }
    // })
    .exec(function(err, user){       
        return res.render('user_profile', {
                    title: 'User Profile',
                    profile : user
                });
    });
};

module.exports.update = async function(req, res){
    try{
        if(req.user.id == req.params.id){

            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log(err);
                    return res.redirect('back');
                }
                console.log(req.file);
                user.name = req.body.name; //We wouldnt be able to read req.body without using multer
                                           //as the form now has a different encryption type
                user.email = req.body.email;
                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    user.avatar = User.avatarPath+'/'+req.file.filename;
                }
                user.save();
            });


            req.flash('success', 'Profile Updated Successfully');
            return res.redirect('back');   

        }
    }catch(err){

        req.flash('error', 'Some Error Ocurred');
        console.log(err);
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