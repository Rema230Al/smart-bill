require('dotenv').config();
const mongoose = require('mongoose');
const User = require("./models/user");
const Receipt = require("./models/receipt");
const encry = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const multer = require("multer");
const upload = multer({dest:"/upload"});
const app = express();
app.use(express.json()); 
const {authMiddleware}= require("./middleware/auth");
const {extractText}= require("./services/ocrService");
const {parseReceiptText}= require('./services/receiptService');


// app.post("/receipts/scan",upload.single("receipt"),async (req,res) => {

//     try{
//     const rawText =await extractText(req.file.path);
//     const text = parseReceiptText(rawText);
//      res.status(200).json({
//             ...text,
//             imagePath: req.file.path   
//         });

//     }catch(err){
//         console.log("the error is"+err);
//         res.status(404).json({error: "error"+err})
//     }

// })


app.post('/receipts',authMiddleware,async (req,res)=>{

    try{

        const{storeName,date,total,category,notes,imagePath}=req.body;

        const receipt= new Receipt({
            storeName,
            date,
            total,
            category,
            notes,
            imagePath,
            userId:req.user.id
        })
         await  receipt.save();

        res.status(202).json({message:"Valid receipt",receipt});

    }catch(err){
    res.status(500).json({message:"Falid to save receipt:"+err});

    }
})

app.get('/receipts',authMiddleware,async (req,res)=>{
    try{

    
        const receipt = await Receipt.find({userId:req.user.id});
        res.status(200).json(receipt);

    }catch(err){
        res.status(500).json({message:"Faild to fetch receipt:"+ err});
    }
})

app.post('/signup', async(req,res)=>{

    try{

    
        const { name, email, password} =req.body;
        const isMatch = await User.findOne({email});

        if(isMatch){
            return res.status(404).json({error: "The email is exist"});
        }

        const hashedPassword = await encry.hash(password , 10);
        const user = new User({name,email, password: hashedPassword});
        await user.save();

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET,{expiresIn:'7d'});

        res.status(202).json({message:"account created",token});
    }catch(err){
        res.status(404).json({message:"signup is"+err });
    }
})


app.post('/login',async (req,res)=>{

    try{

   
        const {email,password}=req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({error:"User not found"});
        }

        const isMatch = await encry.compare(password , user.password);

        if(!isMatch){
            return res.status(401).json({error:"Incorrect Password"});
        }

        const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn : '7d'});
        res.status(200).json({message:"login success",token});
     }
     catch(err){
        res.status(404).json({mess: "login is"+err });
     }
})

//sign in endpoint
//login endpoint
//auth

mongoose.connect(process.env.MONGO_URL)
    .then(()=> {app.listen(3000);
    console.log("DB connect")})
    .catch((err)=> console.log("Mongo connection err"+ err))


