
const express = require("express");
const app = express();
const { connection } = require("./server/server")
const cors = require("cors")
const {auth}=require("./middlewares/auth")
app.use(cors())
app.use(express.json());
//
const {userRouter}=require("./routes/User.route")
const {emiRouter}=require("./routes/emi.route")
//
require("dotenv").config();
const PORT = process.env.PORT;
app.get("/",(req,res)=>{
    res.send("EMI Calculator Backend")
})
app.use("/",userRouter)
app.use("/user",auth,emiRouter)
app.listen(PORT, async () => {
    try {
        await connection
        console.log("server connected to database")
    } catch (error) {
        console.log("unable to connect to database")
        console.log(error)
    }
    console.log(`server is listening in port ${PORT}`)
})