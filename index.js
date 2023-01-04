const express =require("express");
const app= express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const helmet=require ("helmet");
const morgan=require ("morgan");
const userRoute= require("./routes/users");
const authRoute= require("./routes/auth");

dotenv.config();
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifieldTopology: true},()=>{
    console.log("connected to mongodb")
});

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

app.listen(8000,()=>{
    console.log("backend server is running on port 8000")
})