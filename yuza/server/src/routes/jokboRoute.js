const express = require('express');
const router = express.Router();
const jokboController = require('../controllers/jokboController');

// 모든 족보 조회
router.get('/', jokboController.getAllJokbos);
// 특정 족보 조회
router.get('/:id', jokboController.getJokboById);
// 족보 추가
router.post('/write', jokboController.createJokbo);
// 족보 수정
router.put('/:id', jokboController.updateJokbo);
// 족보 삭제
router.delete('/:id', jokboController.deleteJokbo);

module.exports = router;
