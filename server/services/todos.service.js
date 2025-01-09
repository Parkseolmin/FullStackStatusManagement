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

const updateTodo = async (id, data) => {
  const { text, status } = data;

  // 유효성 검증
  if (!text || typeof text !== 'string' || text.trim() === '') {
    const error = new Error('Invalid or empty text');
    error.status = 400;
    throw error;
  }

  if (!['active', 'completed'].includes(status)) {
    const error = new Error('Status must be "active" or "completed"');
    error.status = 400;
    throw error;
  }

  // Todo 존재 확인
  const existingTodo = await Todo.findById(id);
  if (!existingTodo) {
    const error = new Error('Todo not found');
    error.status = 404;
    throw error;
  }

  // 수정 로직
  const updatedTodo = await Todo.findByIdAndUpdate(
    id,
    { text, status },
    { new: true },
  ).populate('author', 'name email'); // 작성자 정보 포함

  if (!updatedTodo) {
    const error = new Error('Failed to update todo');
    error.status = 500;
    throw error;
  }

  return updatedTodo; // 수정된 투두 반환
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
