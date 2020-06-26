const mongoose = require('mongoose');

const friendsSchema = new mongoose.Schema({
    user_id:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    friend_id:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    request_accepted:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});


const Friendships = mongoose.model('Friendships', friendsSchema);
module.exports = Friendships;