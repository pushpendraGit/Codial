const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');
const postsController = require('../controllers/posts_controller');
const friendsController = require('../controllers/friends_Controller');


// router.get('/profile/:id', passport.checkAuthentication, usersController.profile);


router.get('/profile/:id', usersController.profile);
router.get('/friends', friendsController.renderPage);
router.get('/friend-requests', friendsController.friendRequests);
router.get('/sign-out', usersController.signOut);
router.post('/update/:id',passport.checkAuthentication, usersController.update);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/sign-in'},
), usersController.createSession);

router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

router.post('/create', usersController.create)

router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/sign-in'
}), usersController.createSession);

module.exports = router;