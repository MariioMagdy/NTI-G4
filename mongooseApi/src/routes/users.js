const userModel =require("../models/users")
const express = require("express")
const router = new express.Router()

router.post("/addUser", async(req,res)=>{
    const user=new userModel(req.body)
    try {
    await  user.save()
    await user.generateToken()
        res.status(200).send({
            status:1,
            data:user,
            message:"user added"

        })
        
    } catch (error) {
        res.status(400).send({
            status:0,
            data:error.message,
            message:"There is an error in addUser"
        })
    }
   
})
router.get("/allUsers", async(req,res)=>{
   try {
       
    const Users= await userModel.find()
    res.status(200).send({
        status:1,
        data:Users,
        message:"all data receieved"
    })
   } catch (error) {
    res.status(400).send({
        status:0,
        data:error.message,
        message:"error in retrive data"
    })
   }
})
router.get("/singleUser/:id", async(req,res)=>{
   id=req.params.id
   
   try {
       user= await userModel.findById(id)
       res.status(200).send({
           status:1,
           data:user,
           message:"User Avalabile"
       })
   } catch (error) {
    res.status(400).send({
        status:0,
        data:error.message,
        message:"error in retrive data"
    })
   }
})
router.patch("/editUser/:id", async(req,res)=>{

    availableUpdates =["email","password","phoneNumber"]
    const reqKeys=Object.keys(req.body)
  flag=  reqKeys.every(key=>availableUpdates.includes(key))
    try {
        if(!flag){
         throw new Error("not available")
              }
      updatedUser= await userModel.findByIdAndUpdate(
             req.params.id,
             req.body,
             {runValidators:true}
         ) 
         data= await userModel.findById(req.params.id)
         res.status(200).send({
             status:1,
             data:updatedUser,
             message:"succses"
         })    
    } catch (error) {
        res.status(400).send({
            status:0,
            data:error.message,
            message:"error updating  data"
        })
    }
   
})
router.delete("/deleteUser/:id", async(req,res)=>{
    const id= req.params.id
    try {
    del= await userModel.findByIdAndDelete(id)
        res.status(200).send({
            status:1,
            data:del,
            message:"delete element"

        })
    } catch (error) {
        res.status(400).send({
            status:0,
            data:error.message,
            message:"delete error"
        })
        
    }
   
})



module.exports=router