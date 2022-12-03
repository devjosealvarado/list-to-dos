const todosRouter = require('express').Router();
const User = require('../models/user');
const Todo = require('../models/todo');
    
todosRouter.post('/', async (request, response) => {
    const { user } = request;

    if (!user) {
        return response.sendStatus(401);
    }

    const { text } = request.body;

    const newTodo = new Todo({
        text,
        checked: false,
        user: user._id
    });

    const savedTodo = await newTodo.save();

    response.status(201).json(savedTodo);
});

todosRouter.get('/', async (request, response) => {
    // COMPRUEBA QUE EL USUARIO INICIO SESION
    const { user } = request;

    if (!user) {
        return response.sendStatus(401);
    }

    const todos = await Todo.find({user: user._id});

    response.status(200).json(todos);

});

todosRouter.delete('/:id', async (request, response) => {
    // ELIMINA TAREAS
    const { user } = request;

    if (!user) {
        return response.sendStatus(401);
    }

    await Todo.findByIdAndDelete(request.params.id);

    response.sendStatus(204);

});

todosRouter.patch('/:id', async (request, response) => {
    // EDITA EL CHECK
    const { user } = request;

    if (!user) {
        return response.sendStatus(401);
    }
    const { checked } = request.body;
    await Todo.findByIdAndUpdate(request.params.id, {checked: checked});
    response.sendStatus(200);
});

module.exports = todosRouter;