import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    taskName : {
        type : String,
        required : true    
    },
    taskPriority : {
        type : String,
        required : true
    }
},
{ timestamp: true}
)



const Tasks = mongoose.model("Tasks", taskSchema);

export default Tasks