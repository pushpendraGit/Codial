const express = require('express');
const router = express.Router();
const passport = require('passport');

const likesController = require('../controllers/likes_controller');

router.get('/toggle', passport.checkAuthentication, likesController.toggleLike);

module.exports = router;

// app.get('/fruit/:fruitName/:fruitColor', function(req, res) {
//     var data = {
//         "fruit": {
//             "apple": req.params.fruitName,
//             "color": req.params.fruitColor
//         }
//     }; 

//     send.json(data);
// });