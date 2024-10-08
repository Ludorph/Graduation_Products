const menuModel = require('../models/majorModel');
const jokboModel = require("../models/jokboModel");

// 모든 메뉴 조회
const getAllMajor = async (req, res) => {
    try {
        const rows = await menuModel.getAllMajor();

        // 전공을 학부별로 그룹화
        const groupedDepartments = rows.reduce((acc, row) => {
            if (!acc[row.department_name]) {
                acc[row.department_name] = [];
            }
            acc[row.department_name].push(row.major_name);
            return acc;
        }, {});

        res.json(groupedDepartments);
    } catch (error) {
        console.error('쿼리 실행 실패:', error);
        res.status(500).json({ error: '서버 오류' });
    }
};

const getMajorById = async (req, res) => {
    const { id } = req.params;
    try {
        const menu = await menuModel.getMajorById(id);
        if (menu) {
            res.json(menu);
        } else {
            res.status(404).json({ error: '전공을 찾을 수 없습니다.' });
        }
    } catch (error) {
        console.error('쿼리 실행 실패:', error);
        res.status(500).json({ error: '서버 오류' });
    }
};

module.exports = {
    getAllMajor,
    getMajorById
};
