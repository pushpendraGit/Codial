const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const env = require('../../../config/enviroment');

module.exports.createSession = async function(req, res){
    try{
        let user = await User.findOne({
            email : req.body.email
        });

        if(!user || user.password != req.body.password){
            return res.json(422, {
                message: "Unauthenticated users"
            });
        }
        return res.json(200, {
            data: {
              token: jwt.sign(user.toJSON(), env.jwt_secret, {
                  expiresIn: '10000'
              })  
            },
            message: "User successfully authenticated"
        })
    }catch(err){
        console.log("ERROR:" , err);
    }
}