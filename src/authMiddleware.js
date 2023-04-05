const jwt = require("jsonwebtoken");
const {secret} =require("./authConfig");

function verifyToken(req, res, next){
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).json({message:"Token nao fornecido"});
    }

    try{
        const decoded = jwt.verify(token, secret);
        req.id = decoded.id;
        next();

    }catch(error){
        return res.status(401).json({message:"token invalido"});
    }
}

module.exports ={
    verifyToken,
};