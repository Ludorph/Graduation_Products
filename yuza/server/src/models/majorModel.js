const db = require('../config/db');

const getAllMajor = async () => {
    const query = 'SELECT * FROM major_information';
    const [rows] = await db.execute(query);
    return rows;
};

const getMajorById = async (id) => {
    const query = 'SELECT * FROM major_information WHERE major_name = ?';
    const [rows] = await db.execute(query, [id]);
    return rows[0] || null;
};

module.exports = {
    getAllMajor,
    getMajorById
};