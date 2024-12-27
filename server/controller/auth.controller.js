const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
require('dotenv').config();

const authController = {};
authController.authenticate = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer 토큰 분리
  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // 토큰 검증
  req.user = { userId: decoded.userId }; // 검증된 토큰 정보를 req.user에 추가
  next(); // 다음 미들웨어 또는 컨트롤러로 이동
});

module.exports = authController;

// 미들웨어
