const Todo = require('../models/Todo');
const asyncHandler = require('../utils/asyncHandler'); // asyncHandler 임포트

const todoController = {};

todoController.getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find();
  res.status(200).json(todos);
});

todoController.createTodo = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const newTodo = await Todo.create({ text });
  res.status(201).json(newTodo);
});

todoController.updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updatedTodo = await Todo.findByIdAndUpdate(
    id,
    { status },
    { new: true },
  );
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
