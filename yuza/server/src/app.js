// backend/app.js
const express = require('express');
const db = require('./db');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// 기본 라우트
app.get('/', (req, res) => res.send('Hello World'));

// 데이터베이스 조회 라우트
app.get('/db', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM examdata_post');
        res.json(rows);
    } catch (error) {
        console.error('쿼리 실행 실패:', error);
        res.status(500).json({ error: '서버 오류' });
    }
});

app.get('/db/:id', async (req, res) => {
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
});

app.post('/db/write', async (req, res) => {
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
});

module.exports = app;
