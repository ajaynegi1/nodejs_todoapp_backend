
import mongoose from "mongoose"
import {task }from "../modles/task.js"

export const  newtask = async (req,res,next)=>{

    try{
        
      const {title,description} = req.body

await task.create({title
    ,description
    ,user:req.user })

    res.status(201).json({
        sucess:true,
        message:"task created"
    })


    }
    catch(error){
        next(error)
    }


 

}


export const mytask = async (req,res,next)=>{
    try {
        const mytask = await task.find({user:req.user._id})
    res.status(200).json({
        sucess:true,
        mytask
    })
    } catch (error) {
        next(error)
    }
}


export const updatetask = async (req,res,next)=>{

    const {id} =req.params;

    try {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid task ID');
        }

        const update = await task.findById(id)
        if(!update){
            return next(new Error ('task not found'))
        }
        update.iscompleated=!update.iscompleated
        await update.save()
        
        res.status( 200).json({
            sucess:true,
            message:"task updated",
            update
        })

        
    } catch (error) {
        next(error)
        
    }
   

}  

export const deletetask = async (req, res, next) => {
    const { id } = req.params;


    try {
        // Check if the id parameter is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid task ID');
        }

        // Find the task by its ID
        const deltask = await task.findById(id);

        // If the task doesn't exist, return an error
        if (!deltask) {
            return next(new Error('Task not found'));
        }

        // Delete the task
        await deltask.deleteOne();

        // Send success response
        res.status(200).json({
            success: true,
            message: 'Task deleted'
        });
    } catch (error) {
        // Pass any caught errors to the error handling middleware
        next(error);
    }
};