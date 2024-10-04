const db = require('../config/db');

const getAllCertificates = async () => {
    const query = 'SELECT certificate_id, certificate_name FROM certificate_information';
    const [rows] = await db.execute(query);
    return rows;
};

const getAllCertifications = async () => {
    const query = 'SELECT * FROM question_post';
    const [rows] = await db.execute(query);
    return rows;
};

const getCertificationById = async (id) => {
    const query = 'SELECT qp.question_title, qi.question_content FROM question_post qp JOIN question_information qi ON qp.question_post_id = qi.question_post_id WHERE qp.question_post_id = ?';
    const [rows] = await db.execute(query, [id]);
    return rows[0] || null;
};

const createCertification = async ({ certificate, question_title, question_content, question_type }) => {
    const insertPostQuery = 'INSERT INTO question_post (certificate_id, question_title) VALUES (?, ?)';
    const [postResult] = await db.execute(insertPostQuery, [certificate, question_title]);
    const questionPostId = postResult.insertId;

    const insertInfoQuery = 'INSERT INTO question_information (question_id, question_content, question_type) VALUES (?, ?, ?)';
    await db.execute(insertInfoQuery, [questionPostId, question_content, question_type]);

    return questionPostId;
};

const updateCertification = async (id, { question_title, question_description, question_answer }) => {
    const query = `
        UPDATE question_post qp
        INNER JOIN question_information qi ON qp.question_id = qi.question_id
        SET
            qp.question_title = ?,
            qi.question_content = ?,
            qp.question_date = CURRENT_TIMESTAMP
        WHERE qp.question_post_id = ?
    `;
    await db.execute(query, [question_title, question_description, id]);
};

const deleteCertification = async (id) => {
    const query = 'DELETE FROM question_post WHERE question_post_id = ?';
    await db.execute(query, [id]);
};

module.exports = {
    getAllCertificates,
    getAllCertifications,
    getCertificationById,
    createCertification,
    updateCertification,
    deleteCertification
};
