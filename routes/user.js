import express from "express";


import {  login,logout,  register ,myprofile} from "../controller/user.js"; 
import { isauthenticated } from "../middlewares/isauthenticated.js";

const router = express.Router();

router.post("/new", register)

router.post("/login",login)


router.get("/my",isauthenticated,myprofile)
 
router.get("/logout", isauthenticated,logout)





export default router; 
 