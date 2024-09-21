const db = require('../config/db');

// 모든 족보 조회
exports.getAllJokbos = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM examdata_post');
        res.json(rows);
    } catch (error) {
        console.error('쿼리 실행 실패:', error);
        res.status(500).json({ error: '서버 오류' });
    }
};

// 특정 족보 조회
exports.getJokboById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM examdata_post WHERE examdata_post_id = ?', [id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ error: '족보를 찾을 수 없습니다.' });
        }
    } catch (error) {
        console.error('쿼리 실행 실패:', error);
        res.status(500).json({ error: '서버 오류' });
    }
};

// 족보 추가
exports.createJokbo = async (req, res) => {
    const { user_id, examdata_title, examdata_content } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO examdata_post (user_id, examdata_title, examdata_content) VALUES (?, ?, ?)',
            [user_id, examdata_title, examdata_content]
        );
        res.json({ success: true, insertId: result.insertId });
    } catch (error) {
        console.error('쿼리 실행 실패:', error);
        res.status(500).json({ error: '서버 오류' });
    }
};

// 족보 수정
exports.updateJokbo = async (req, res) => {
    const { id } = req.params;
    const { examdata_title, examdata_content } = req.body;
    try {
        await db.query(
            'UPDATE examdata_post SET examdata_title = ?, examdata_content = ?, examdata_udate = CURRENT_TIMESTAMP WHERE examdata_post_id = ?',
            [examdata_title, examdata_content, id]
        );
        res.json({ success: true, message: '족보가 성공적으로 수정되었습니다.' });
    } catch (error) {
        console.error('족보 수정 실패:', error);
        res.status(500).json({ error: '서버 오류' });
    }
};

// 족보 삭제
exports.deleteJokbo = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM examdata_post WHERE examdata_post_id = ?', [id]);
        res.json({ success: true, message: '족보가 성공적으로 삭제되었습니다.' });
    } catch (error) {
        console.error('족보 삭제 실패:', error);
        res.status(500).json({ error: '서버 오류' });
    }
};
