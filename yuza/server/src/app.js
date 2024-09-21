const express = require('express');
const app = express();
const cors = require('cors');
const jokboRoutes = require('./routes/jokbo');

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

server.on('error', (error) => {
    console.error('Server error:', error);
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Hello World'));

// 족보 관련 라우트
app.use('/db', jokboRoutes);

// 404 핸들러
app.use((req, res, next) => {
    res.status(404).json({ error: '라우트를 찾을 수 없습니다.' });
});

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: '서버 내부 오류' });
});

module.exports = app;
