const pool = require('../config/db');

const createUser = async (user) => {
    const { user_id, user_password, user_name, user_grade, manager_id } = user;
    const query = `INSERT INTO user_information (user_id, user_password, user_name, user_grade, manager_id) VALUES (?, ?, ?, ?, ?)`;
    const [result] = await pool.execute(query, [user_id, user_password, user_name, user_grade, manager_id]);
    return result;
};

const findUserById = async (user_id) => {
    const query = `SELECT * FROM user_information WHERE user_id = ?`;
    const [rows] = await pool.execute(query, [user_id]);
    return rows[0];
};

module.exports = {
    createUser,
    findUserById
};
