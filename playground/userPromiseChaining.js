const User=require('../src/model/user');
require('../src/db/mongoose');

// User.findByIdAndUpdate('5d404adf9074b50e5c224afb',{age:24}).then((res)=>{
//     console.log(res);
//     return User.countDocuments({age:23});
// }).then((res)=>{
//     console.log(res);

// }).catch((error)=>{
//     console.log(error);
// })

const findCountAndUpdate=async (id,age)=>{
const update=User.findByIdAndUpdate(id,{age});
const count=User.countDocuments();
return count;
}

findCountAndUpdate('5d404adf9074b50e5c224afb',44).then((count)=>{
    console.log('count is'+count);
}).catch((error)=>{
    console.log(error);
})