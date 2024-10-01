const db = require('../config/db');

// 모든 메뉴 조회



exports.getAllMenu = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT department_name, major_name FROM major_information ORDER BY department_name, major_name');

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
// const getMajorInfo = async (majorId) => {
//     const [rows] = await connection.execute(
//         'SELECT m.major_name, c.certificate_name FROM major_information m LEFT JOIN certificate_information c ON m.major_id = c.major_id WHERE m.major_id = ?',
//         [majorId]
//     );
//     return rows;
// };