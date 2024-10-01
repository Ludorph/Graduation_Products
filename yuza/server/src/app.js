const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoute');
const menuRoutes = require('./routes/menu');
const jokboRoutes = require('./routes/jokbo');
const CertificationRoutes = require('./routes/Certification');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    // allowedHeaders: ['Authorization'],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => res.send('Hello World!'));

// 라우트 연결
app.use('/users', userRoutes);
app.use('/test', menuRoutes);
app.use('/db', jokboRoutes);
app.use('/api/Certification', CertificationRoutes);


// 서버 시작
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});

module.exports = app;
