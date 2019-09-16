const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')

const userSchema=new mongoose.Schema({
        name:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            trim:true,
            unique:true,
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


userSchema.statics.findByCredentials=async (email,password)=>{

    const user=await User.findOne({email});
    if(!user){
        return 'Unable to login';
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return 'Unable to login';
    }
    console.log(user);
    return user;
}

userSchema.pre('save',async function(next){
    const user=this;

    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8);

        next();
    }
})


const User=mongoose.model('User',userSchema);

module.exports=User