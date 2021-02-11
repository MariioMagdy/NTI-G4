const mongoose= require("mongoose")

const Validator=require("validator")
const jwt=require("jsonwebtoken")
const bcerybt=require("bcrypt")


const userSchema= new mongoose.Schema({
name:{
    type:String,
    required:true,
    trim:true,
    minlength:3,
},
email:{
    type:String,
    unique: true,
    required:true,
    trim:true,
    validate(value){
        if(!Validator.isEmail(value)){
            throw new Error("email is invalid")
        }
    },
},
password:{
    type:String,
    required:true,
    trim:true,
    minlength:7,
},
phoneNumber:{
    type:String,
    required:true,
    minlength:7,
    validate(value){
        if(!Validator.isMobilePhone(value,"ar-EG")){
            throw new Error("need egyption number")
        }
    }
},
tokens :[
    {
        token:{type:String}
    }
]
})
userSchema.methods.generateToken= async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},"123")
    user.tokens=user.tokens.concat({token})
    await user.save()
    return user
}
userSchema.pre("save",async function(next){
const user= this
if(user.isModified("password"))
    user.password= await bcerybt.hash(user.password,12)
    next()
})
const user =mongoose.model("user",userSchema)

module.exports=user