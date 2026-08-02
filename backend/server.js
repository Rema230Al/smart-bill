//to connect with env file
require('dotenv').config();
const mongoose = require('mongoose');
const express = require("express");
const multer = require("multer");
const upload = multer({dest:"/upload"});
const app = express();
const {extractText}= require("./services/ocrService");
const {parseReceiptText}= require('./services/receiptService');


app.post("/receipt/scan",upload.single("receipt"),async (req,res) => {
    
    try{
    const rawText =await extractText(req.file.path);
    const text = parseReceiptText(rawText);
    res.status(3000).json(text);

    }catch(err){
        console.log("the error is"+err);
        res.status(404).json({error: "error"+err})
    }

})




mongoose.connect(process.env.MONGO_URL)
    .then(()=> console.log("MongooDB Connect"))
    .catch((err)=> console.log("Mongo connection err"+ err))


app.listen(3000);