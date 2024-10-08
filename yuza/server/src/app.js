const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoute');
const majorRoutes = require('./routes/majorRoute');
const jokboRoutes = require('./routes/jokboRoute');
const CertificationRoutes = require('./routes/CertificationRoute');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    // allowedHeaders: ['Authorization'],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/users', userRoutes);
app.use('/major', majorRoutes);
app.use('/jokbo', jokboRoutes);
app.use('/api/Certification', CertificationRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});

module.exports = app;
