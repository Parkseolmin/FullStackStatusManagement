const todoService = require('../services/todos.service');
const asyncHandler = require('../utils/asyncHandler');

const todoController = {};

// 모든 할 일 가져오기
todoController.getTodos = asyncHandler(async (req, res) => {
  const todos = await todoService.getTodos();
  res.status(200).json(todos);
});

// 새로운 할 일 생성
todoController.createTodo = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const { userId } = req.user; // 인증 미들웨어에서 전달된 userId
  const newTodo = await todoService.createTodo(text, userId);
  res.status(201).json(newTodo);
});

// 할 일 업데이트
todoController.updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updatedTodo = await todoService.updateTodo(id, status);
  res.status(200).json(updatedTodo);
});

// 할 일 삭제
todoController.deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedTodo = await todoService.deleteTodo(id);
  res.status(200).json({ message: 'Todo deleted successfully' });
});

module.exports = todoController;
