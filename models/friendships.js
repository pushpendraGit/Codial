const mongoose = require('mongoose');

const friendsSchema = new mongoose.Schema({
    user_id:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    friend_id:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
},{
    timestamps: true
});


const Friendships = mongoose.model('Friendships', friendsSchema);
module.exports = Friendships;