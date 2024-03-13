 import jwt from "jsonwebtoken"
 export const sendcookies =(user,res,message,statuscode)=>{


    const token =jwt.sign({_id:user._id},process.env.SECRET_KEY)
 
    res.cookie('auth',token , { maxage:1000 *60*15  , httpOnly:true ,sameSite:"none", secure : true}) //this will set the cookie
                            .status(statuscode)
                            .json({sucess : true, token, user,
                            message })

}