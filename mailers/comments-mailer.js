const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    console.log("Comment: ", comment);
    let htmlString = nodeMailer.renderTemplate({
        comment: comment
    }, '/comments/new_comment.ejs')
    nodeMailer.transporter.sendMail({
        from: 'parmarshashank11@gmail.com',
        to: comment.user.email,
        subject: 'Your Comment has been successfully published!!!',
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log(err);
            return;
        }
        // console.log("Message successfully sent", info);
        console.log("Message successfully sent");
        return;
    })
};

exports.newCommentPost = (comment, post) => {
    console.log("Comment: ", comment);
    console.log("Post: ", post);
    let htmlString = nodeMailer.renderTemplate({
        comment: comment
    }, '/comments/new_commentPost.ejs')
    nodeMailer.transporter.sendMail({
        from: 'parmarshashank11@gmail.com',
        to: post.user.email,
        subject: `${comment.user.name} commented on your post`,
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log(err);
            return;
        }
        // console.log("Message successfully sent", info);
        console.log("Message successfully sent");
        return;
    })
};