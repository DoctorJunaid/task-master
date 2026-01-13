const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const filePath = path.join(__dirname, "../data/mainData.json");


const _readFullFile = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        return [];
    }
};

const getAllTodos = async (userId) => {
    const allData = await _readFullFile();
    return allData.filter(t => t.userId === userId);
};

const createTodo = async (title, description, dueDate, userId) => {
    const allData = await _readFullFile();
    const newTodo = {
        id: crypto.randomUUID(),
        userId,
        todoName: title,
        todoDescription: description,
        dueDate: dueDate,
        isDone: false,
        createdAt: new Date().toISOString()
    };
    allData.push(newTodo);
    await fs.writeFile(filePath, JSON.stringify(allData, null, 2));
    return allData.filter(t => t.userId === userId);
};

const deleteTodo = async (id, userId) => {
    const allData = await _readFullFile();
    // Keep everyone else's todos OR todos that don't match this ID
    const updatedList = allData.filter(t => t.id !== id || t.userId !== userId);

    await fs.writeFile(filePath, JSON.stringify(updatedList, null, 2));
    // Return ONLY this user's remaining list
    return updatedList.filter(t => t.userId === userId);
};

const updateTodo = async ({ id, todoName, todoDescription, dueDate, userId }) => {
    const allData = await _readFullFile();
    const index = allData.findIndex(t => t.id === id && t.userId === userId);

    if (index !== -1) {
        allData[index] = { ...allData[index], todoName, todoDescription, dueDate };
        await fs.writeFile(filePath, JSON.stringify(allData, null, 2));
    }
    return allData.filter(t => t.userId === userId);
};

const updateTodoStatus = async (id, userId) => {
    const allData = await _readFullFile();
    const index = allData.findIndex(t => t.id === id && t.userId === userId);

    if (index !== -1) {
        allData[index] = { ...allData[index], isDone: !allData[index].isDone };
        await fs.writeFile(filePath, JSON.stringify(allData, null, 2));
    }
    return allData.filter(t => t.userId === userId);
};

const deleteAllTodo = async (userId) => {
    const allData = await _readFullFile();
    const remainingData = allData.filter(t => t.userId !== userId);
    await fs.writeFile(filePath, JSON.stringify(remainingData, null, 2));
    return [];
};

const getTodo = async (id, userId) => {
    const allData = await _readFullFile();
    return allData.find(t => t.id === id && t.userId === userId) || null;
};

module.exports = {
    createTodo,
    deleteTodo,
    deleteAllTodo,
    updateTodo,
    updateTodoStatus,
    getAllTodos,
    getTodo
};