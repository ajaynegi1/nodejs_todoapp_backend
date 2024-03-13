import express from "express";
import {newtask,mytask,updatetask,deletetask} from "../controller/task.js";
import { isauthenticated } from "../middlewares/isauthenticated.js";

const router = express.Router();
 
router.post("/newtask",isauthenticated ,newtask)
 
router.get("/mytask",isauthenticated,mytask)
 
router.route("/:id").put(isauthenticated,updatetask).delete(isauthenticated,deletetask)

export default router
 