const express = require('express');
const todoController = require('../controllers/todos.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// 모든 할 일 가져오기
router.get('/', todoController.getTodos);

// 할 일 추가하기
router.post('/', authMiddleware, todoController.createTodo);

// 체크 상태 업데이트
router.put('/:id', authMiddleware, todoController.updateTodo);

// 삭제하기
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
