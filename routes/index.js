const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');
const usersController = require('../controllers/users_controller');



router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
router.use('/friends', require('./friends'));

router.use('/api', require('./api'));

router.use('/likes', require('./likes'));

router.get('/sign-up', usersController.signUp); //display the sign-in page
router.get('/sign-in', usersController.signIn); //display the sign-up page
// router.post('/create', usersController.create); //create a new user in the database through the signup form

// for any further routes, access from here
// router.use('/routerName', require('./routerfile));


module.exports = router;