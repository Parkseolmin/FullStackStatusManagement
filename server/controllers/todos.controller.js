const todoService = require('../services/todos.service');
const asyncHandler = require('../utils/asyncHandler');

const todoController = {};

// 모든 할 일 가져오기
todoController.getTodos = asyncHandler(async (req, res) => {
  const { category } = req.query || 'today';
  const todos = await todoService.getTodos(category);
  res.status(200).json(todos);
});

// 새로운 할 일 생성
todoController.createTodo = asyncHandler(async (req, res) => {
  const { text, category = 'today' } = req.body;
  const { userId } = req.user; // 인증 미들웨어에서 전달된 userId
  const newTodo = await todoService.createTodo(text, category, userId);
  res.status(201).json(newTodo);
});

// 할 일 업데이트
todoController.updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params; // 수정할 투두 ID
  const { text, status } = req.body; // 클라이언트에서 전달된 데이터
  const updatedTodo = await todoService.updateTodo(id, { text, status }); // 서비스 호출
  res.status(200).json(updatedTodo); // 수정된 투두 반환
});

// 할 일 삭제
todoController.deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedTodo = await todoService.deleteTodo(id);
  res.status(200).json({ message: 'Todo deleted successfully' });
});

module.exports = todoController;
