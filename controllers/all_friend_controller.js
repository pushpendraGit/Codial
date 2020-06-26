const User = require('../models/user');

module.exports.allFriend = function(req, res)
{

    User.find({}, function(err,users){

        if(err)
        {

            console.log('Error in all friend section', er);

            return res.redirect('/');
        }

        return res.render('all_friends', {

            title:'Codial |User',

            users:users
        })
    })


}