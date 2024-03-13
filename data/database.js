import mongoose from "mongoose";
export const connectdb = ()=>{

//-------- mongodb connect

mongoose.connect(process.env.MONGO_URI, { dbName: "backendapi" })
.then(() => console.log("connected to database"))
.catch((e) => {
  console.log(e);
});



//-------mongodb connect end 


}