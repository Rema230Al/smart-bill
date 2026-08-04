require('dotenv').config();
const mongoose = require('mongoose');
const userSchemas = require("./models/user");
const receiptSchema = require("./models/receipt");
const jwt = require("jsonwebtoken");
const express = require("express");
const multer = require("multer");
const upload = multer({dest:"/upload"});
const app = express();
const {extractText}= require("./services/ocrService");
const {parseReceiptText}= require('./services/receiptService');


app.post("/receipts/scan",upload.single("receipt"),async (req,res) => {

    try{
    const rawText =await extractText(req.file.path);
    const text = parseReceiptText(rawText);
     res.status(200).json({
            ...text,
            imagePath: req.file.path   
        });

    }catch(err){
        console.log("the error is"+err);
        res.status(404).json({error: "error"+err})
    }

})

app.get('/all-receipts',(req,res)=>{

})

//sign in endpoint
//login endpoint
//auth

mongoose.connect(process.env.MONGO_URL)
    .then(()=> {app.listen(3000);
    console.log("DB connect")})
    .catch((err)=> console.log("Mongo connection err"+ err))


