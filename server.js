import express from 'express'
import { configDotenv } from 'dotenv'
import { connectDB } from './app/config/dbConfig.js'
import taskRouter from './app/router/task.route.js'
import taskModel from "./app/model/task.model.js"


const app = express()

configDotenv()
connectDB()


const PORT = 8000

app.use(express.json())

app.use(express.static("public"));
app.set('views', './app/views');
app.set('view engine', 'ejs');


app.use('/tasks', taskRouter)

app.get('/', async (req,res)=>{
    const tasks = await taskModel.find()
    console.log(tasks)
    res.render('Home',{
        tasks : tasks
    })
})

app.listen(PORT, ()=>{
    console.log(`server is working on ${PORT}`)
})