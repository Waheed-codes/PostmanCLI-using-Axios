import express from "express"
import dotenv from "dotenv"
dotenv.config()
const port = process.env.PORT
import userRouter from "./controllers/users/public.js"
import todoRouter from "./controllers/todo/public.js"
const app= express()
app.use(express.json())

app.get("/health", (req,res)=>{
    res.status(200).json({msg:"THis APi is up and Running"})
})

app.use("/user",userRouter)
app.use("/todo",todoRouter)
app.listen(port,()=>{
    console.log(`Server is runnig at port ${port}`)
})
