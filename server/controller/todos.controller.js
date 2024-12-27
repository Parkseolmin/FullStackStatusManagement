const Todo = require('../models/Todo');
const asyncHandler = require('../utils/asyncHandler'); // asyncHandler 임포트

const todoController = {};

todoController.getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find().populate('author', 'name email');
  res.status(200).json(todos);
});

todoController.createTodo = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const { userId } = req.user; // 인증 미들웨어에서 전달받은 userId

  // 새로운 Todo 생성
  const newTodo = await Todo.create({ text, author: userId });

  // 생성 후 populate로 작성자 정보 추가
  const populatedTodo = await newTodo.populate('author', 'name email');

  res.status(201).json(populatedTodo); // Populated 데이터를 반환
});

todoController.updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updatedTodo = await Todo.findByIdAndUpdate(
    id,
    { status },
    { new: true },
  ).populate('author', 'name email');

  if (!updatedTodo) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  res.status(200).json(updatedTodo);
});

todoController.deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedTodo = await Todo.findByIdAndDelete(id);
  if (!deletedTodo) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  res.status(200).json({ message: 'Todo deleted successfully' });
});

module.exports = todoController;
