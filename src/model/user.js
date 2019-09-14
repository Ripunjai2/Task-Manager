const mongoose=require('mongoose')
const validator=require('validator')

const User=mongoose.model('User',{
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid e-mail');
            }
        }
    },
    age:{
        type:Number,
        required:true,
        default:0,
        validate(value){
            if(value<0){
                throw new Error('You are yet to be born in '+(value*-1)+' years')
            }
        }

    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Your password cannot be password')
            }
        },
        trim:true,
        // validate(value){
        //     if(value.length<=6){
        //         throw new Error('Length of your passwor must be greater than 6')
        //     }
        // }
        minlength:7
    }
})

module.exports=User