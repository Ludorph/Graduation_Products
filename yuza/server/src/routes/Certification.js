const express = require('express');
const router = express.Router();
const CertificationController = require('../controllers/CertificationController');


// 모든 자격증 목록 조회 (새로운 API)
router.get('/certificates', CertificationController.getAllCertificates);

// 모든 자격증 문제 조회
router.get('/', CertificationController.getAllCertification);

// 특정 자격증 문제 조회
router.get('/:id', CertificationController.getCertificationById);

// // 자격증 문제 추가
router.post('/', CertificationController.createCertification);

// // 자격증 문제 수정
router.put('/:id', CertificationController.updateCertification);
//
// // 자격증 문제 삭제
router.delete('/:id', CertificationController.deleteCertification);

module.exports = router;