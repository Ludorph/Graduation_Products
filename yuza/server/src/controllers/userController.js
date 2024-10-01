const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
require('dotenv').config({ path: '../.env' });

// JWT 토큰 생성 함수
const generateTokens = (user_id) => {
    const accessToken = jwt.sign({ user_id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ user_id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
};

const register = async (req, res) => {
    try {
        const { user_id, user_password, user_name, user_grade } = req.body;

        // 입력 유효성 검사
        if (!user_id || !user_password || !user_name || !user_grade) {
            return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
        }

        if (!['일반 유저', '관리자'].includes(user_grade)) {
            return res.status(400).json({ message: '유효하지 않은 user_grade 입니다.' });
        }

        // 중복된 사용자 확인
        const existingUser = await userModel.findUserById(user_id);
        if (existingUser) {
            return res.status(409).json({ message: '이미 사용 중인 user_id 입니다.' });
        }

        // 비밀번호 해싱
        const hashedPassword = await bcrypt.hash(user_password, 10);

        // manager_id 설정
        const manager_id = user_grade === '관리자' ? user_id : null;

        // 사용자 생성
        const newUser = {
            user_id,
            user_password: hashedPassword,
            user_name,
            user_grade,
            manager_id
        };

        await userModel.createUser(newUser);

        // JWT 토큰 생성
        const { accessToken, refreshToken } = generateTokens(user_id);

        // 쿠키에 토큰 설정
        res.cookie('accessToken', accessToken, { httpOnly: true });
        res.cookie('refreshToken', refreshToken, { httpOnly: true });

        res.status(201).json({ message: '회원가입이 완료되었습니다.' });
    } catch (error) {
        console.error('회원가입 오류:', error);
        res.status(500).json({ message: '서버 에러' });
    }
};

const login = async (req, res) => {
    try {
        const { user_id, user_password } = req.body;

        // 입력 유효성 검사
        if (!user_id || !user_password) {
            return res.status(400).json({ message: '아이디와 비밀번호를 입력해주세요.' });
        }

        // 사용자 존재 여부 확인
        const user = await userModel.findUserById(user_id);
        if (!user) {
            return res.status(401).json({ message: '잘못된 아이디 또는 비밀번호입니다.' });
        }

        // 비밀번호 비교
        const isMatch = await bcrypt.compare(user_password, user.user_password);
        if (!isMatch) {
            return res.status(401).json({ message: '잘못된 아이디 또는 비밀번호입니다.' });
        }

        // JWT 토큰 생성
        const { accessToken, refreshToken } = generateTokens(user_id);

        // 쿠키에 토큰 설정
        res.cookie('accessToken', accessToken, { httpOnly: true });
        res.cookie('refreshToken', refreshToken, { httpOnly: true });

        // 사용자 정보 응답
        res.status(200).json({
            message: '로그인 성공',
            user: {
                user_id: user.user_id,
                user_name: user.user_name,
                user_grade: user.user_grade
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 에러' });
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.status(200).json({ message: '로그아웃 성공' });
    } catch (error) {
        console.error('로그아웃 오류:', error);
        res.status(500).json({ message: '서버 에러' });
    }
};

const refreshToken = async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        return res.status(403).json({ message: '토큰이 없습니다.' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const { accessToken } = generateTokens(decoded.user_id);
        res.cookie('accessToken', accessToken, { httpOnly: true });
        res.status(200).json({ message: '토큰 갱신 성공' });
    } catch (error) {
        console.error('토큰 갱신 오류:', error);
        res.status(403).json({ message: '유효하지 않은 토큰입니다.' });
    }
};

const getMe = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        const user = await userModel.findUserById(user_id);
        if (!user) {
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }

        res.status(200).json({
            user: {
                user_id: user.user_id,
                user_name: user.user_name,
                user_grade: user.user_grade
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 에러' });
    }
};

module.exports = {
    register,
    login,
    logout,
    refreshToken,
    getMe
};
