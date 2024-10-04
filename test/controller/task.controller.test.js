import request from 'supertest'
import express from 'express'
import { addNewTask, getAllTasks, deleteTask } from '../../app/controller/task.controller.js'
import TasksModel from '../../app/model/task.model.js'
import Tasks from '../../app/model/task.model.js'

jest.mock('../../app/model/task.model.js')

const app = express()
app.use(express.json())
app.post('/api/new-task', addNewTask)
app.post('/api/delete-task', deleteTask)
app.get('/api/get-all-tasks', getAllTasks)


describe('Task controller tests', () => { 
    beforeEach(()=>{
        jest.clearAllMocks()
    })

    //Test for addTask
    it('POST /api/new-task - should add a new task', async () => {
        TasksModel.prototype.save = jest.fn().mockResolvedValueOnce(true)
        TasksModel.find = jest.fn().mockResolvedValueOnce([{taskName : 'Test task', taskPriority : 'high'}])

        const response = await request(app).post('/api/new-task').send({ name : 'Test task', priority : 'high'})

        expect(response.statusCode).toBe(201)
        expect(response.body).toEqual({
            message : "New task added successfully",
            tasks : [{taskName : 'Test task', taskPriority : 'high'}]
        })

    })

    it('POST /api/new-task -should return 400 when input fields are missing', async() =>{
        const response = await request(app).post('/api/new-task').send({name : '', priority : ''})

        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({message : "All fields are required.!!"})
    })

    //Test for deleteTask
    it('POST /api/delete-task - should delete a task', async() => {
        TasksModel.findByIdAndDelete = jest.fn().mockResolvedValueOnce({taskName : 'Test task', taskPriority : 'high'})
        TasksModel.find = jest.fn().mockResolvedValueOnce([])

        const response = await request(app).post('/api/delete-task').send({taskId : '1'})

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({
            message: 'Task deleted successfully',
            tasks: []
        })
    })

    it('DELETE /api/tasks - should return 404 if task is not found', async () => {
        Tasks.findByIdAndDelete = jest.fn().mockResolvedValueOnce(null)

        const response = await request(app).post('/api/delete-task').send({ taskId: '1' })

        expect(response.statusCode).toBe(404)
        expect(response.body).toEqual({ message: 'task not found' })
    })

    //Test for getAllTasks
    it('GET /api/get-all-tasks - should return all tasks', async () => {
        const tasks = [{taskName : 'Test task', taskPriority : 'high'}]
        Tasks.find = jest.fn().mockResolvedValueOnce(tasks)

        const response = await request(app).get('/api/get-all-tasks')
        
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(tasks)
    })
})