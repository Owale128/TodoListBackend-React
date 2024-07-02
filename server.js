const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const connectDB = require('./database/db')
const Todo = require('./model/todoModel')

connectDB()
app.use(cors())
app.use(bodyParser.json());


app.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
});


app.post('/api/post', async (req, res) => {
    const todo = new Todo ({
        title: req.body.title,
        completed: req.body.completed
    });
    try {
        const newTodo = await todo.save()
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({message: err.message})
    }
});

app.put('/api/complete/:id', async(req, res)=> {
    const id = req.params.id;
    try {
        const todo = await Todo.findById(id);
        if(!todo) {
            return res.status(404).json({ message: 'Todo not found'});
        }
        todo.completed = !todo.completed;
        await todo.save();
        res.json({ message: 'Todo marked as completed', todo})
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
});

app.delete('/api/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Todo.findByIdAndDelete(id);
        res.sendStatus(204);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});