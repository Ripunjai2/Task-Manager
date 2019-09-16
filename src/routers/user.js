const express=require('express');
const User=require('../model/user');
const router=new express.Router;



router.post('/users',async(req,res)=>{
    const user=new User(req.body);
try{
const userr=await user.save();
res.status(201).send(userr);
}catch(error){
res.status().send('ERROR '+error);
}
})

router.patch('/users/:id',async(req,res)=>{

        const updates=Object.keys(req.body);
        const allowedUpdates=['name','email','age','password'];
        const isUpatesAllowed=updates.every((update)=>allowedUpdates.includes(update));

        if(!isUpatesAllowed){
            return res.status(400).send('Invalid Update request');
        }

    try{
        //const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
        
        const user=await User.findById(req.params.id);
        updates.forEach((update)=>user[update]=req.body[update])
        await user.save();
        
        if(!user){
            res.status(400).send('Invalid User');
        }
        res.send(user);
    }catch(error){
        res.status(error).send('ERROR '+error);
    }
})


router.get('/users',async (req,res)=>{
try{
    const users=await User.find();
    res.send(users);
}catch(error){
    res.status(500).send('ERROR '+error);
}
})

router.get('/users/:id',async (req,res)=>{
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

router.delete('/users/:id',async(req,res)=>{

    try{
        const user=await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(400).send('Requested user not found');
        }
        res.send(user);
    }catch(error){
        res.status(500).send('ERROR '+error);
    }
})

router.post('/users/login',async (req,res)=>{
    try{
        const user=await User.findByCredentials(req.body.email,req.body.password);
        res.send(user);
    }catch(error){
        res.status(400).send(error);
    }
})

// router.post('/users/login',async (req,res)=>{
//     try{
//         await res.send('im in');
//     }catch(error){
//         res.status(404).send('im in but in error');
//     }
// })


module.exports=router;