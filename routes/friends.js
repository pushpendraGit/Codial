const express = require('express');
const router = express.Router();
const passport = require('passport');


const friendsController = require('../controllers/friends_Controller');


router.get('/toggle-friend/:id', passport.checkAuthentication, friendsController.toggleFriend);


module.exports = router;