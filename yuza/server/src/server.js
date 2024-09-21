const app = require('./app');
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// 에러 처리
server.on('error', (error) => {
    console.error('Server error:', error);
});

module.exports = server;