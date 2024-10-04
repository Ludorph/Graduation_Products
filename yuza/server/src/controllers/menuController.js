const menuModel = require('../models/menuModel');

// 모든 메뉴 조회
const getAllMenu = async (req, res) => {
    try {
        const rows = await menuModel.getAllMenu();

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

module.exports = {
    getAllMenu
};
