const Task=require('../src/model/task');
require('../src/db/mongoose.js');

// Task.findByIdAndUpdate('5d404cfda6e1ab0eed95c66b',{Completed:false}).then((res)=>{
//     console.log(res);
//     return Task.countDocuments({Completed:false});
// }).then((res)=>{
//     console.log(res);
// }).catch((error)=>{
//     console.log(error);
// ask})

const findAndUpateTask=async(id)=>{
    const upatedTask=await Task.findByIdAndUpdate(id,{Completed:false});
    const count=await Task.countDocuments();
    return count;
}

findAndUpateTask('5d404cfda6e1ab0eed95c66b').then((count)=>{
console.log(count);
}).catch((error)=>{
    console.log(error);
})