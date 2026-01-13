const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const filePath = path.join(__dirname, "../data/mainData.json");


const getAllTodos = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        return [];
    }
};

const createTodo = async (title, description, dueDate , userId) => {
    const todo = await getAllTodos();
    const newTodo = {
        id: crypto.randomUUID(),
        todoName: title,
        todoDescription: description,
        dueDate: dueDate,
        isDone: false,
        createdAt: new Date().toISOString()
    };
    todo.push(newTodo);
    await fs.writeFile(filePath, JSON.stringify(todo, null, 2));
    return todo;
};

const deleteTodo = async (id , userId) => {
    const todo = await getAllTodos();
    const updatedList = todo.filter(t => t.id !== id);
    await fs.writeFile(filePath, JSON.stringify(updatedList, null, 2));
    return updatedList;
};

const updateTodo = async ({ id, todoName, todoDescription, dueDate }) => {
    const todo = await getAllTodos();
    const index = todo.findIndex(t => t.id === id);

    if (index !== -1) {

        todo[index] = { ...todo[index], todoName, todoDescription, dueDate };
        await fs.writeFile(filePath, JSON.stringify(todo, null, 2));
    }
    return todo;
};

const updateTodoStatus = async (id) => {
    const todo = await getAllTodos();
    const index = todo.findIndex(t => t.id === id);

    if (index !== -1) {

        todo[index] = { ...todo[index], isDone: !todo[index].isDone };
        await fs.writeFile(filePath, JSON.stringify(todo, null, 2));
    }
    return todo;
};

const deleteAllTodo = async () => {
    await fs.writeFile(filePath, '[]');
    return [];
};

const getTodo = async (id , userId)=> {

}

module.exports = {
    createTodo,
    deleteTodo,
    deleteAllTodo,
    updateTodo,
    updateTodoStatus,
    getAllTodos,
    getTodo
};