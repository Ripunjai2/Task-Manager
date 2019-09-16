const express=require('express');
const Task=require('../model/task');
const router=new express.Router;


router.post('/tasks',async(req,res)=>{
    const task=new Task(req.body);
    try{
        const taskk=await task.save();
        res.send(task);
    }catch(error){
        res.send('Error: '+error);
    }
})

router.patch('/tasks/:id',async(req,res)=>{

    const updates=Object.keys(req.body);
    const allowedUpdates=['Completed','Description'];
    const isUpatesAllowed=updates.every((update)=>allowedUpdates.includes(update));
    if(!isUpatesAllowed){
        return res.send('Invalid update request');
    }
    try{
        //const task=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
        const task=await Task.findById(req.params.id);
        updates.forEach((update)=>{task[update]=req.body[update]});
        await task.save();
        
        if(!task){
            return res.status(400).send('Invalid task!');
        }
        res.send(task);
    }catch(error){
        res.status(500).send('ERROR  '+error);
    }
})


router.get('/tasks',async(req,res)=>{

    try{
        const tasks=await Task.find();
        res.send(tasks);    
    }catch(error){
        res.send('Error '+error);
    }
})

router.get('/tasks/:id',async(req,res)=>{

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

router.delete('/tasks/:id',async(req,res)=>{
    try{
        const task=await Task.findByIdAndDelete(req.params.id);
        if(!task){
            return res.status(400).send('Invalid delete request');
        }
        res.send(task);
    }catch(error){
        res.send('ERROR '+error);
    }
})



module.exports=router;