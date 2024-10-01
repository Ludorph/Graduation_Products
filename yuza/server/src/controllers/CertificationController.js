const db = require('../config/db');

// 모든 자격증 목록 조회(id, 이름)
exports.getAllCertificates = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT certificate_id, certificate_name FROM certificate_information');
        res.json(rows);
    } catch (error) {
        console.error('쿼리 실행 실패:', error);
        res.status(500).json({ error: '서버 오류' });
    }
};


//등록 버튼 누를시 백엔드에 문제 등록 API 추가
//시도중이라 주석처리
// exports.createCertification = async (req, res) => {
//     const { certificate, type, question, options, answers } = req.body;
//
//     try {
//         const [result] = await db.query(
//             'INSERT INTO question_post (certificate_id, question_title, question_type) VALUES (?, ?, ?)',
//             [certificate.certificate_id, question, type]
//         );
//
//         const questionId = result.insertId;
//
//         if (type === '객관식' && options && answers) {
//             for (let i = 0; i < options.length; i++) {
//                 await db.query(
//                     'INSERT INTO question_options (question_id, option_text, is_correct) VALUES (?, ?, ?)',
//                     [questionId, options[i], answers[i]]
//                 );
//             }
//         }
//
//         res.json({ success: true, message: '문제가 성공적으로 등록되었습니다.' });
//     } catch (error) {
//         console.error('문제 등록 실패:', error);
//         res.status(500).json({ error: '문제 등록 중 서버 오류가 발생했습니다.' });
//     }
// };

// 모든 자격증 문제 조회
exports.getAllCertification = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM question_post');
        res.json(rows);
    } catch (error) {
        console.error('쿼리 실행 실패:', error);
        res.status(500).json({ error: '서버 오류' });
    }
};

// 특정 자격증 문제 조회
exports.getCertificationById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query(`SELECT qp.question_title, qi.question_content FROM question_post qp JOIN question_information qi ON qp.question_post_id = qi.question_post_id = ?`, [id]);

        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ error: '자격증 문제를 찾을 수 없습니다.' });
        }
    } catch (error) {
        console.error('쿼리 실행 실패:', error);
        res.status(500).json({ error: '서버 오류' });
    }
};

// 자격증 문제 삭제
exports.deleteCertification = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM question_post WHERE question_post_id = ?', [id]);
        res.json({ success: true, message: '자격증 문제가 성공적으로 삭제되었습니다.' });
    } catch (error) {
        console.error('자격증 문제 삭제 실패:', error);
        res.status(500).json({ error: '서버 오류' });
    }
};

exports.updateCertification = async (req, res) => {
    const { id } = req.params;
    const { question_title, question_description, question_answer } = req.body;
    try {
        await db.query(`
            UPDATE question_post qp
            INNER JOIN question_information qi ON qp.question_id = qi.question_id
            SET 
                qp.question_title = ?,
                qi.question_content = ?,
                qp.question_date = CURRENT_TIMESTAMP
            WHERE qp.question_post_id = ?
        `, [question_title, question_description, id]);

        res.json({ success: true, message: '자격증 문제가 성공적으로 수정되었습니다.' });
    } catch (error) {
        console.error('자격증 문제 수정 실패:', error);
        res.status(500).json({ error: '서버 오류' });
    }
};

// 족보 추가
exports.createCertification = async (req, res) => {
    console.log('Received data:', req.body);
    const { certificate, question_title, question_content, question_type } = req.body;
    try {
        const [result] = await db.query(`
      INSERT INTO question_post (certificate_id, question_title)
      VALUES (?, ?)
    `, [certificate, question_title]);

        const questionPostId = result.insertId;

        await db.query(`
      INSERT INTO question_information (question_id, question_content, question_type)
      VALUES (?, ?, ?)
    `, [questionPostId, question_content, question_type]);

        res.status(201).json({ success: true, message: '자격증 문제가 성공적으로 등록되었습니다.' });
    } catch (error) {
        console.error('자격증 문제 등록 실패:', error);
        res.status(500).json({ error: '서버 오류' });
    }
};

// // 족보 수정
// exports.updateCertification = async (req, res) => {
//     const { id } = req.params;
//     const { examdata_title, examdata_content } = req.body;
//     try {
//         await db.query(
//             'UPDATE examdata_post SET examdata_title = ?, examdata_content = ?, examdata_udate = CURRENT_TIMESTAMP WHERE examdata_post_id = ?',
//             [examdata_title, examdata_content, id]
//         );
//         res.json({ success: true, message: '족보가 성공적으로 수정되었습니다.' });
//     } catch (error) {
//         console.error('족보 수정 실패:', error);
//         res.status(500).json({ error: '서버 오류' });
//     }
// };
//