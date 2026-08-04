const jwt =require("jsonwebtoken");
const { model } = require("mongoose");

function authMiddleware(req,res,next){

    const authHearder =req.headers.authorization;
    if(!authHearder){
        return res.status(401).json({error:"no token"});
    }


    const token = authHearder.split(' ')[1];

    try{

        const decoded= jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();

    }catch(error){
        res.status(401).json({error:"Invalid token"})
    }

}
module.exports = {authMiddleware};