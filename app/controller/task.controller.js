import taskModel from "../model/task.model.js"

export const addNewTask = async (req,res) => {
    try{    
        const {name , priority} = req.body
        if(!name || !priority){
            return res.status(400).json({message : "All fields are required.!!"})
        }

        const newTask = new taskModel({ taskName : name, taskPriority : priority})
        await newTask.save()

        const tasks = await taskModel.find()


        return res.status(201).json({
            message : "New task added successfully",
            tasks
        })

    }catch(err){
        console.log(err)
        res.status(500).json("Internal Server Error")
    }
}

export const getAllTasks = async (req,res) => {
    try{
        const tasks = await taskModel.find()
        res.status(200).json(tasks)
    }catch(err){
        console.log(err)
        res.status(500).json("Internal Server Error")
    }
}

export const deleteTask = async (req,res) => {
    try{
        const { taskId } = req.body
        const deletedTask = await taskModel.findByIdAndDelete(taskId)
        
        if (!deletedTask) {
            return res.status(404).json({ message: 'task not found' });
          }

        const tasks = await taskModel.find()

        return res.status(200).json({
            message : "Task deleted successfully",
            tasks
        })

    }catch(err){
        console.log(err)
        res.status(500).json("Internal Server Error")
    }
}