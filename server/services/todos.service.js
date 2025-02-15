const Todo = require('../models/Todo');
const { getRegExp } = require('korean-regexp');

// 할 일 검색
const searchTodos = async (userId, category, search, filter) => {
  const query = { author: userId, category };
  if (search && search.trim() !== '') {
    const regex = getRegExp(search, { initialSearch: true, fuzzy: true }); // 검색어를 기반으로 정규식 생성
    query.text = { $regex: regex }; // 텍스트 필드에서 정규식 검색
  }

  // 필터 처리
  if (filter && filter !== 'all') {
    query.status = filter; // `active` 또는 `completed`
  }

  return await Todo.find(query).populate('author', 'name email'); // 작성자 정보 포함
};

// 모든 할 일 가져오기
const getTodos = async (category) => {
  const query = category ? { category } : {}; // category 조건 추가
  return await Todo.find(query).populate('author', 'name email');
};

// 새로운 할 일 생성
const createTodo = async (text, category, userId) => {
  if (!text || !userId) {
    const error = new Error('Invalid data for creating todo');
    error.status = 400;
    throw error;
  }

  const newTodo = await Todo.create({ text, category, author: userId });
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
  searchTodos,
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
