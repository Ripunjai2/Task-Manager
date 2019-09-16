const express=require('express');
require('./db/mongoose.js');

// const User=require('./model/user');
// User.findByCredentials('rohit2@gmail.com','sabMadarchodHain');

const userRouter=require('./routers/user');
const taskRouter=require('./routers/task');

const app=express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);





const port=process.env.PORT||3000;
app.listen(port,()=>{
    console.log('Running on port no  '+port);
})