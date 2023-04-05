const jwt = require("jsonwebtoken");
const{secret, expiresIn} = require("./authConfig");

function generateToken(id){
    const token = jwt.sign({id: id}, secret,{
        expiresIn,
    });
    return token;
}



module.exports={
    generateToken,
}