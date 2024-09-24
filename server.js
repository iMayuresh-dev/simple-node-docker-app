import express from 'express'

const app = express()

const PORT = 8000

app.set('views', './app/views');
app.set('view engine', 'ejs');



app.get('/', (req,res)=>{
    res.render('Home')
})

app.listen(PORT, ()=>{
    console.log(`server is working on ${PORT}`)
})