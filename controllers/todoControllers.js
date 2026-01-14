const todoServices = require('../services/todoServices');

// for creating new todo for user
const createTodoController = async (req, res) => {
    try {
        const {todoName, todoDescription, dueDate} = req.body;
        const username = req.user?.username;

        if (!username) return res.status(401).json({isStatus: false, msg: "Unauthorized", data: null});
        if (!todoName) return res.status(400).json({isStatus: false, msg: "Title is required", data: null});

        const allTodos = await todoServices.createTodo(todoName, todoDescription, dueDate, username);
        res.status(201).json({isStatus: true, msg: "Todo created successfully", data: allTodos});
    } catch (error) {
        res.status(500).json({isStatus: false, msg: "Internal Server Error", data: null});
    }
};

// for deleting a specific todo from the user todo list
const deleteTodoController = async (req, res) => {
    try {
        const id = req.params.id;
        const username = req.user?.username;

        if (!id) return res.status(400).json({isStatus: false, msg: "Invalid Id", data: null});

        const allTodos = await todoServices.deleteTodo(id, username);
        res.status(200).json({isStatus: true, msg: "Todo deleted successfully", data: allTodos});
    } catch (error) {
        res.status(500).json({isStatus: false, msg: "Internal Server Error", data: null});
    }
};

// for deleting all todos of the user
const deleteAllTodoController = async (req, res) => {
    try {
        const username = req.user?.username;

        const allTodos = await todoServices.deleteAllTodo(username);
        res.status(200).json({isStatus: true, msg: "All todos deleted successfully", data: allTodos});
    } catch (error) {
        res.status(500).json({isStatus: false, msg: "Internal Server Error", data: null});
    }
};

// for updating todos of the user
const updateTodoController = async (req, res) => {
    try {
        const id = req.params.id;
        const username = req.user?.username;
        const {todoName, todoDescription, dueDate} = req.body;

        if (!id) return res.status(400).json({isStatus: false, msg: "Invalid Id", data: null});

        const allTodos = await todoServices.updateTodo({
            id,
            todoName,
            todoDescription,
            dueDate,
            username
        });
        res.status(200).json({isStatus: true, msg: "Todo updated successfully", data: allTodos});
    } catch (error) {
        res.status(500).json({isStatus: false, msg: "Internal Server Error", data: null});
    }
};

// for updating todos status of the user
const updateTodoStatusController = async (req, res) => {
    try {
        const username = req.user?.username;
        const id = req.params.id;

        if (!id) return res.status(400).json({isStatus: false, msg: "Invalid Id", data: null});

        const allTodos = await todoServices.updateTodoStatus(id, username);
        res.status(200).json({isStatus: true, msg: "Todo status updated successfully", data: allTodos});
    } catch (error) {
        res.status(500).json({isStatus: false, msg: "Internal Server Error", data: null});
    }
};

// for getting a specific todo of the user
const getTodoController = async (req, res) => {
    try {
        const id = req.params.id;
        const username = req.user?.username;

        if (!id) return res.status(400).json({isStatus: false, msg: "Invalid Id", data: null});

        const todo = await todoServices.getTodo(id, username);
        res.status(200).json({isStatus: true, msg: "Todo fetched successfully", data: todo});
    } catch (error) {
        res.status(500).json({isStatus: false, msg: "Internal Server Error", data: null});
    }
};

// for getting all todos of the user
const getAllTodoController = async (req, res) => {
    try {
        const username = req.user?.username;

        const allTodos = await todoServices.getAllTodos(username);
        res.status(200).json({isStatus: true, msg: "All todos fetched successfully", data: allTodos});
    } catch (error) {
        res.status(500).json({isStatus: false, msg: "Internal Server Error", data: null});
    }
};

module.exports = {
    createTodoController,
    deleteTodoController,
    deleteAllTodoController,
    updateTodoController,
    getTodoController,
    getAllTodoController,
    updateTodoStatusController
};