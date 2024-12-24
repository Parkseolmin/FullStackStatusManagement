const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = 5000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// MongoDB 연결
connectDB();

// 라우트 설정
app.use('/api', routes); // 모든 라우트를 /api에 연결

// 에러 핸들링
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// TODO
// 1. User model, controller, route
// 2. Authentication middleware
// 3. JWT (JSON Web Tokens) for authentication
// 4. Validation middleware for input data
// 5. Error handling middleware
// 6. Logging middleware
