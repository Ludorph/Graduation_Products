const certificationModel = require('../models/certificationModel');

// 모든 자격증 목록 조회(id, 이름)
const getAllCertificates = async (req, res) => {
    try {
        const certificates = await certificationModel.getAllCertificates();
        res.json(certificates);
    } catch (error) {
        console.error('쿼리 실행 실패:', error);
        res.status(500).json({ error: '서버 오류' });
    }
};

// 모든 자격증 문제 조회
const getAllCertification = async (req, res) => {
    try {
        const certifications = await certificationModel.getAllCertifications();
        res.json(certifications);
    } catch (error) {
        console.error('쿼리 실행 실패:', error);
        res.status(500).json({ error: '서버 오류' });
    }
};

// 특정 자격증 문제 조회
const getCertificationById = async (req, res) => {
    const { id } = req.params;
    try {
        const certification = await certificationModel.getCertificationById(id);
        if (certification) {
            res.json(certification);
        } else {
            res.status(404).json({ error: '자격증 문제를 찾을 수 없습니다.' });
        }
    } catch (error) {
        console.error('쿼리 실행 실패:', error);
        res.status(500).json({ error: '서버 오류' });
    }
};

// 자격증 문제 추가
const createCertification = async (req, res) => {
    const { certificate, question_title, question_content, question_type } = req.body;
    try {
        const insertId = await certificationModel.createCertification({ certificate, question_title, question_content, question_type });
        res.status(201).json({ success: true, insertId, message: '자격증 문제가 성공적으로 등록되었습니다.' });
    } catch (error) {
        console.error('자격증 문제 등록 실패:', error);
        res.status(500).json({ error: '서버 오류' });
    }
};

// 자격증 문제 수정
const updateCertification = async (req, res) => {
    const { id } = req.params;
    const { question_title, question_description, question_answer } = req.body;
    try {
        await certificationModel.updateCertification(id, { question_title, question_description, question_answer });
        res.json({ success: true, message: '자격증 문제가 성공적으로 수정되었습니다.' });
    } catch (error) {
        console.error('자격증 문제 수정 실패:', error);
        res.status(500).json({ error: '서버 오류' });
    }
};

// 자격증 문제 삭제
const deleteCertification = async (req, res) => {
    const { id } = req.params;
    try {
        await certificationModel.deleteCertification(id);
        res.json({ success: true, message: '자격증 문제가 성공적으로 삭제되었습니다.' });
    } catch (error) {
        console.error('자격증 문제 삭제 실패:', error);
        res.status(500).json({ error: '서버 오류' });
    }
};

module.exports = {
    getAllCertificates,
    getAllCertification,
    getCertificationById,
    createCertification,
    updateCertification,
    deleteCertification
};
