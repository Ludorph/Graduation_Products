const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authMiddleware');

// 회원가입 라우트
router.post('/register', userController.register);
// 로그인 라우트
router.post('/login', userController.login);
// 로그아웃 라우트
router.post('/logout', authenticate, userController.logout);
// 토큰 갱신 라우트
router.post('/refresh-token', userController.refreshToken);
// 현재 사용자 정보 라우트
router.get('/me', authenticate, userController.getMe);

module.exports = router;
