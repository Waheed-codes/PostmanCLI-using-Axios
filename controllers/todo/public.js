import express from "express"
import { readContent, writeContent } from "../../utils/db.js"
import { v4 as uuid } from "uuid"

const router = express.Router()
//create todo
router.post("/create-todo/:id", async (req, res) => {
    try {

        let userId = req.params.id
        let { task } = req.body
        let newTodo = {
            id: uuid(),
            task
        }
        let database = await readContent()
        let existingUser = database.find((item) => item.id == userId)
        if (!existingUser) {
            return res.status(404).json({ msg: "User doesn't exists" })
        }

        existingUser.todos.push(newTodo)
        await writeContent(database)
        return res.json({ "msg": "Todo added Successfully",newTodo })



    } catch (error) {
        console.error(error)
        res.status(500).json({ Error: "Internal Server Error" })
    }
})
// GET API TO GET ALL TODOS
router.get("/getalltodos/:id", async (req, res) => {
    try {
        let database = await readContent();
        let user = database.find((item) => item.id == req.params.id);
        res.status(200).json({ todos: user.todos,user});
    } catch (error) {
        console.error(error);
        res.status(500).json({ Error: "Internal Server Error" });
    }
});

export default router