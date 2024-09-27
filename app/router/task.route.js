import express from "express"
import { addNewTask, deleteTask, getAllTasks } from "../controller/task.controller.js"

const router = express.Router()

router.get('/get-all-tasks', getAllTasks)
router.post('/add-new-task', addNewTask)
router.post('/delete-task', deleteTask)

export default router