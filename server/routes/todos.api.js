const express = require('express');
const todoController = require('../controllers/todos.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// 모든 할 일 가져오기
router.get('/', todoController.getTodos);

router.post('/', authMiddleware, todoController.createTodo);

router.put('/:id', todoController.updateTodo);

router.delete('/:id', todoController.deleteTodo);

module.exports = router;
