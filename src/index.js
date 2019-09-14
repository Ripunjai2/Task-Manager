const express=require('express')
require('./db/mongoose.js')
const User=require('./model/user.js');
const Task=require('./model/task.js')

const app=express();
app.use(express.json());
const port=process.env.PORT||3000;


app.post('/users',async(req,res)=>{
    const user=new User(req.body);
try{
const userr=await user.save();
res.status(201).send(userr);
}catch(error){
res.status().send('ERROR '+error);
}
})

app.patch('/users/:id',async(req,res)=>{

        const updates=Object.keys(req.body);
        const allowedUpdates=['name','email','age','password'];
        const isUpatesAllowed=updates.every((update)=>allowedUpdates.includes(update));

        if(!isUpatesAllowed){
            return res.status(400).send('Invalid Update request');
        }

    try{
        const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
        if(!user){
            res.status(400).send('Invalid Use   r');
        }
        res.send(user);
    }catch(error){
        res.status(error).send('ERROR '+error);
    }
})


app.get('/users',async (req,res)=>{
try{
    const users=await User.find();
    res.send(users);
}catch(error){
    res.status(500).send('ERROR '+error);
}
})

app.get('/users/:id',async (req,res)=>{
try{
    const _id=req.params.id;
    const user=await User.findById(_id);
        if(!user){
            return res.status(404).send('user not found');
        }
        res.send(user);
}catch(error){
    res.status(500).send('ERROR '+error);
}
})

app.post('/tasks',async(req,res)=>{
    const task=new Task(req.body);
    try{
        const taskk=await task.save();
        res.send(task);
    }catch(error){
        res.send('Error: '+error);
    }
})

app.patch('/tasks/:id',async(req,res)=>{

    try{
        const task=Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
        if(!task){}
    }catch(error){

    }
})


app.get('/tasks',async(req,res)=>{

    try{
        const tasks=await Task.find();
        res.send(tasks);    
    }catch(error){
        res.send('Error '+error);
    }
})

app.get('/tasks/:id',async(req,res)=>{

   try{
    const _id=req.params.id;
    const task=await Task.findById(_id);
    if(!task){
        return res.status(400).send('Unable to find task');
    }
    res.send(task);
   }catch(error){
        res.status(500).send('ERROR '+error);
   }
   
})

app.listen(port,()=>{
    console.log('Running on port no  '+port);
})