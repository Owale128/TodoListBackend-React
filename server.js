const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const Todo = require('./model/todoModel')

app.use(bodyParser.json());
app.use(cors())

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


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});