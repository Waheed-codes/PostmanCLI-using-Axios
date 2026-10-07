import express from "express"
import { readContent,writeContent } from "../../utils/db.js"
import {v4 as uuid} from "uuid"
import bcrypt from "bcrypt"


const router = express.Router()

// POST API TO CREATE USER
router.post("/create-user", async (req,res) =>{
    try {
        let {name,email,password}= req.body
        let database = await readContent()
        let checkUser =database.find((item)=> item.email ==email)

        if(checkUser){
            return res.status(400).json({msg:"An user already exists"})
        }

        let newUser= {
            id:uuid(),
            name,
            email,
            hashedPassword: await bcrypt.hash(password,10),
            todos:[]
        }

        database.push(newUser)
        await writeContent(database)
        return res.status(201).json({msg:"User created successfully",newUser})
        
    } catch (error) {
        console.error
        res.status(500).json({Error:"Internal Server Error"})
    }
})
//GET API to get all users
router.get("/users", async (req, res) => {
    try {
        let database = await readContent()
        return res.status(200).json(database)
    } catch (error) {
        console.error(error);
        res.status(500).json({ Error: "Internal Server Error" });
    }
})
//GET API to get a user by id
router.get("users/:userId", async (req, res) => {
    try {

        let userId = req.params.userId
        let database = await readContent()
        let existingUser = database.find((item) => item.id == userId)
        if (!existingUser) {
            return res.status(404).json({ Error: "User Not Found" })
        }
        res.status(200).json(existingUser)

    } catch (error) {
        console.error(error);
        res.status(500).json({ Error: "Internal Server Error" });
    }
})

export default router
