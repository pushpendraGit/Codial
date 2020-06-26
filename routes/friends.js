const express = require('express');
const router = express.Router();
const passport = require('passport');


const friendsController = require('../controllers/friends_Controller');

const allFriendController = require('../controllers/all_friend_controller');


router.get('/toggle-friend/:id', passport.checkAuthentication, friendsController.toggleFriend);
router.get('/AcceptfriendRequest/:id', passport.checkAuthentication, friendsController.requestAccepted);

router.get('/all',allFriendController.allFriend);


module.exports = router;