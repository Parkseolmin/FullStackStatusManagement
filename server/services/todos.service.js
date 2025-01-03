const Todo = require('../models/Todo');

// 모든 할 일 가져오기
const getTodos = async () => {
  return await Todo.find().populate('author', 'name email');
};

// 새로운 할 일 생성
const createTodo = async (text, userId) => {
  if (!text || !userId) {
    const error = new Error('Invalid data for creating todo');
    error.status = 400;
    throw error;
  }

  const newTodo = await Todo.create({ text, author: userId });
  return await newTodo.populate('author', 'name email');
};

// 할 일 업데이트
const updateTodo = async (id, status) => {
  if (!['active', 'completed'].includes(status)) {
    const error = new Error('Invalid status value');
    error.status = 400;
    throw error;
  }

  const updatedTodo = await Todo.findByIdAndUpdate(
    id,
    { status },
    { new: true },
  ).populate('author', 'name email');

  if (!updatedTodo) {
    const error = new Error('Todo not found');
    error.status = 404;
    throw error;
  }

  return updatedTodo;
};

// 할 일 삭제
const deleteTodo = async (id) => {
  const deletedTodo = await Todo.findByIdAndDelete(id);
  if (!deletedTodo) {
    const error = new Error('Todo not found');
    error.status = 404;
    throw error;
  }
  return deletedTodo;
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
