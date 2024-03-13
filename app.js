import express from "express";
import userrouter from "./routes/user.js"
import taskrouter from "./routes/task.js"
import { connectdb } from "./data/database.js";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import  cors from 'cors';

const app = express();
 
config({path:"./config.env"})

connectdb()

// adding middleware to send or recive json data fron req.body
app.use(express.json())

app.use(cookieParser()) 

app.use(cors({
  origin:[process.env.FORNTEND_URI],
  methods:["GET","POST","PUT",'DELETE'],
  credentials:true
}) ) //for cross origin resource sharing

app.use( errorMiddleware); // this will catch all the errors that are not handled by the middlewares 
app.use("/api/v1/users",userrouter)
app.use("/api/v1/task",taskrouter)

app.get("/", (req, res) => {
  res.send(" welcom to home api");
});
  
 
 



app.listen(process.env.PORT, () => {
  console.log(`server is running on part: ${process.env.PORT}`);
});
 
    