const express = require('express');
const passport = require('passport');

const router = express.Router();
const homeController = require('../controllers/home_controller');
const usersController = require('../controllers/users_controller');

console.log('router loaded');


router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));

router.get('/sign-up', usersController.signUp); //display the sign-in page
router.get('/sign-in', usersController.signIn); //display the sign-up page
router.post('/create', usersController.create); //create a new user in the database through the signup form

// for any further routes, access from here
// router.use('/routerName', require('./routerfile));


module.exports = router;