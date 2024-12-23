const express = require('express');
const router = express.Router();

const todosRoutes = require('./todos.api');

router.use('/todos', todosRoutes); // /api/tasks 라우트 연결

module.exports = router;
