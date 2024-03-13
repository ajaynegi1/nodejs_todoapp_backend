import { moddb } from "../modles/user.js"
import jwt  from "jsonwebtoken"

 export const isauthenticated = async (req,res,next)=>{

 const isauth =req.cookies.auth 
 
   if(!isauth){

    return res.status(404).json({
      sucess:false,
      message:"unauthenticated user login first"
    })

   }
    const authverify = jwt.verify(req.cookies.auth,process.env.SECRET_KEY)

    req.user = await moddb.findById(authverify._id)
     next()


}