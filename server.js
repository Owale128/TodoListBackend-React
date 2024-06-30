const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors())

app.get('/', async (req, res) => {

    try {
        const todos = await todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
});

