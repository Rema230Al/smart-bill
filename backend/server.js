const express =require('express');
const app= express();

app.listen(3000);

//the res and req object the express add more functionality for them
app.get("/",function(req,res){

    res.send('this the hompage')
})

//thatt mean every request as json -- use metho
app.use(express.json());