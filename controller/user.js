import { moddb } from "../modles/user.js";
import { sendcookies } from "../utils/features.js";
import bcrypt from "bcrypt"




export const login =async (req,res)=>{
 try {
  const {email,password} = req.body
  let user = await moddb.findOne({email}).select("+password")
   if(!user){
    return res.status(404).json({
      sucess:false,
      message:"User not found!"
    })
    
   }

   const match = await bcrypt.compare(password,user.password)
   if (!match) {
       return res.status(401).json({
         sucess:false, 
         message:"Invalid email or password!"
       })
   }

   sendcookies( user,res,`login sucessfully ${user.name}`,200)
 } catch (error) {
  next(error)
 }

} 


export const register = async(req,res)=>{
  try {
    const {name,email,password} = req.body
  let user = await moddb.findOne({email})
  if(user){

    return res.status(404).json({
      sucess:false,
      message:"user already created"
    })

  }

      const hashpass = await bcrypt.hash(password,10)
  
 
  user= await moddb.create({name,email,password:hashpass})

  sendcookies( user,res,"registered sucessfully",201)
  } catch (error) {
    next(error)
  }

  
}


export const myprofile = (req, res) => {

  res.status(200).json({
    sucess:true,
    user:req.user
  })


   
}



export const logout = (req,res)=>{
 
  res.status(200).cookie("auth",null,{sameSite:"none",secure:true, maxAge:0, expire:new Date(Date.now())} ).json({
    sucess:true,
    message:"logged out"
  })

}


