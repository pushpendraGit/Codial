const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');
const postsController = require('../controllers/posts_controller');

// router.get('/profile', passport.checkAuthentication, usersController.profile);

router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.get('/sign-out', usersController.signOut);
router.post('/update/:id',passport.checkAuthentication, usersController.update);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/'},
), usersController.createSession);



module.exports = router;