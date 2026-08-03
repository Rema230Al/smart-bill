const mongoose= require('mongoose');
const receiptSchema= new mongoose.Schema({
    storeName:{
        type:String,
        required:true,
    },
    date:{
        type:String
    },
    total:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    notes:{
        type:String
    },
    imagePath:{
        type:String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,ref :'User'
    }

    
});

module.exports=mongoose.model('Receipt',receiptSchema);