const db = require('../config/db');

const getAllJokbos = async () => {
    const query = 'SELECT * FROM examdata_post';
    const [rows] = await db.execute(query);
    return rows;
};

const getJokboById = async (id) => {
    const query = 'SELECT * FROM examdata_post WHERE examdata_post_id = ?';
    const [rows] = await db.execute(query, [id]);
    return rows[0] || null;
};

const createJokbo = async ({ user_id, examdata_title, examdata_content }) => {
    const query = 'INSERT INTO examdata_post (user_id, examdata_title, examdata_content) VALUES (?, ?, ?)';
    const [result] = await db.execute(query, [user_id, examdata_title, examdata_content]);
    return result.insertId;
};

const updateJokbo = async (id, { examdata_title, examdata_content }) => {
    const query = 'UPDATE examdata_post SET examdata_title = ?, examdata_content = ? WHERE examdata_post_id = ?';
    await db.execute(query, [examdata_title, examdata_content, id]);
};

const deleteJokbo = async (id) => {
    const query = 'DELETE FROM examdata_post WHERE examdata_post_id = ?';
    await db.execute(query, [id]);
};

module.exports = {
    getAllJokbos,
    getJokboById,
    createJokbo,
    updateJokbo,
    deleteJokbo
};
