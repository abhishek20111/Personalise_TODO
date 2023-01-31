const express= require('express');
const mongoose = require('mongoose');
const app = express();
const User = require('./model/user')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_secret = "hgghhkhuituyfhgbkjlkjlkhkgyjfhjhbhjbjkhilkj";
const Todo= require('./model/todo')
const cors = require('cors');


app.use(express.json());
app.use(cors())
const PORT = '8080';  

mongoose.connect(`mongodb://localhost:27017`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err.message);
  });


  const requireLogin = (req, res, next)=>{
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error: "you must login"});
    }
    try{
        const {userId} = jwt.verify(authorization, jwt_secret);
        req.user = userId;
        next();
    }catch(error){
        console.log(error);
        return res.status(401).json({error: "you must login"});
    }
    
  }





app.get('/', (req, res)=>{
    res.json({message: "hello world"});
})

app.post('/signup',async(req, res)=>{
    const {email, password}= req.body;
    try{
        if(!email || !password){
            return res.status(422).json({error:"Please fill data"})
        }
        const user = await User.findOne({email})
        if(user){
            return  res.status(422).json({error:"user already exist"});
        }
        const hashPassword = await bcryptjs.hash(password, 12);
        await new User({
            email,
            password: hashPassword
        }).save();
        res.status(200).json({message: "signup sycces login"})
    }catch(error){
        console.log(error);
    }
})

app.post('/signin',async(req, res)=>{
    const {email, password}= req.body;
    try{
        if(!email || !password){
            return res.status(422).json({error:"Please fill data"})
        }
        const user = await User.findOne({email})
        if(!user){
            return  res.status(404).json({error:"user not exist"});
        }
        const hashMatch = await bcryptjs.compare(password, user.password);
        if(hashMatch){
            const token = jwt.sign({userId: user._id}, jwt_secret);
            res.status(201).json({token});
        }else{
            return  res.status(404).json({error:"Invalid credential"});
        }
        res.status(200).json({message: "signup sycces login"})
    }catch(error){
        console.log(error);
    }
})

app.post('/createtodo',requireLogin,async (req, res)=>{
    const data = await new Todo({
        todo: req.body.todo,
        todoBy: req.user
    }).save();
    res.status(200).json({message:data})
})
 
app.get('/gettodo',requireLogin, async(req, res)=>{
    const data = await Todo.find({
        todoBy: req.user
    })
    res.status(200).json({message: data});
})

app.delete('/remove/:id',async(req, res)=>{
    const data = await Todo.findOneAndDelete({_id: req.params.id});
    res.status(200).json({message: data});
})


app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`)); 