const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

 
const POSTPIC_PATH = path.join('/uploads/users/posts');


const postSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    uploadPic: [{
        type: String
    }],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
},{
    timestamps: true
});



var storage = multer.diskStorage({
    destination: function (req, file, cb) { //where is the file going to be stored
      cb(null, path.join(__dirname  ,'..', POSTPIC_PATH)) //location where we will save the avatar
    },
    filename: function (req, file, cb) {  //what will be the name of the file
      cb(null, file.originalname + '-' + Date.now()); //Date.now() -> EPOC time
    },   //file.fieldname => uploadPic (All files will be stored like uploadPic-124141314, uploadPic-234242442, etc)
    
});





//static functions

postSchema.statics.uploadedPic = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
         } else {            
                //   cb(null, false);
                //   return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
            req.fileValidationError = 'goes wrong on the mimetype';
            return cb(null, false, new Error('goes wrong on the mimetype'));
        }

    }

}).array('uploadPic', 5); //.single() tells that only one file will be uploaded
postSchema.statics.picPath = POSTPIC_PATH; //making the POSTPIC_PATH accessible to pulblic




const Post = mongoose.model('Post', postSchema);
module.exports = Post;