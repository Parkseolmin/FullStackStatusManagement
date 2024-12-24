const User = require('../models/User');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const bcrypt = require('bcryptjs'); // bcrypt 모듈 추가
require('dotenv').config();

const userController = {};

// 회원가입 로직
userController.createUser = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;

  console.log('password는 암호화 전 상태:', password);
  // 이미 존재하는 이메일 체크
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email is already in use' });
  }
  // 새로운 유저 생성
  const newUser = await User.create({ email, name, password });

  console.log('password는 암호화 후 상태:', newUser.password);

  // 생성된 유저 응답
  res.status(201).json({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
  });
});

// 로그인 로직
userController.loginWithEmail = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 이메일과 비밀번호 검증
  if (!email || !password) {
    // 이 구문은 asyncHandler와 독립적으로 Express의 응답 처리로 넘어갑니다.
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // 유저 찾기
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // 비밀번호 검증
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  // 토큰 생성
  const accessToken = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1d' },
  );

  const refreshToken = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' },
  );

  res.status(200).json({
    status: 'success',
    user: { id: user.id, name: user.name, email: user.email },
    tokens: { accessToken, refreshToken },
  });
});

module.exports = userController;
