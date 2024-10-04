const jokboModel = require('../models/jokboModel');

// 모든 족보 조회
const getAllJokbos = async (req, res) => {
    try {
        const jokbos = await jokboModel.getAllJokbos();
        res.json(jokbos);
    } catch (error) {
        console.error('쿼리 실행 실패:', error);
        res.status(500).json({ error: '서버 오류' });
    }
};

// 특정 족보 조회
const getJokboById = async (req, res) => {
    const { id } = req.params;
    try {
        const jokbo = await jokboModel.getJokboById(id);
        if (jokbo) {
            res.json(jokbo);
        } else {
            res.status(404).json({ error: '족보를 찾을 수 없습니다.' });
        }
    } catch (error) {
        console.error('쿼리 실행 실패:', error);
        res.status(500).json({ error: '서버 오류' });
    }
};

// 족보 추가
const createJokbo = async (req, res) => {
    const { user_id, examdata_title, examdata_content } = req.body;
    try {
        const insertId = await jokboModel.createJokbo({ user_id, examdata_title, examdata_content });
        res.json({ success: true, insertId });
    } catch (error) {
        console.error('쿼리 실행 실패:', error);
        res.status(500).json({ error: '서버 오류' });
    }
};

// 족보 수정
const updateJokbo = async (req, res) => {
    const { id } = req.params;
    const { examdata_title, examdata_content } = req.body;
    try {
        await jokboModel.updateJokbo(id, { examdata_title, examdata_content });
        res.json({ success: true, message: '족보가 성공적으로 수정되었습니다.' });
    } catch (error) {
        console.error('족보 수정 실패:', error);
        res.status(500).json({ error: '서버 오류' });
    }
};

// 족보 삭제
const deleteJokbo = async (req, res) => {
    const { id } = req.params;
    try {
        await jokboModel.deleteJokbo(id);
        res.json({ success: true, message: '족보가 성공적으로 삭제되었습니다.' });
    } catch (error) {
        console.error('족보 삭제 실패:', error);
        res.status(500).json({ error: '서버 오류' });
    }
};

module.exports = {
    getAllJokbos,
    getJokboById,
    createJokbo,
    updateJokbo,
    deleteJokbo
};
