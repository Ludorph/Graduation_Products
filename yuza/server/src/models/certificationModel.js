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

const createCertification = async ({ user_id, certificate_id, question_title, questions }) => {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // 1. Insert into question_post table
        const insertPostQuery = 'INSERT INTO question_post (user_id, certificate_id, question_title) VALUES (?, ?, ?)';
        const [postResult] = await connection.execute(insertPostQuery, [user_id, certificate_id, question_title]);
        const questionPostId = postResult.insertId;

        // 2. Insert questions and options
        for (const question of questions) {
            const insertInfoQuery = 'INSERT INTO question_information (question_post_id, question_content, question_explanation, question_tag) VALUES (?, ?, ?, ?)';
            const [infoResult] = await connection.execute(insertInfoQuery, [questionPostId, question.question_content, question.question_explanation, question.question_tag]);
            const questionId = infoResult.insertId;

            if (question.question_type === '객관식' && Array.isArray(question.options)) {
                const insertOptionQuery = 'INSERT INTO question_options (question_id, options_num, options_content, is_correct) VALUES (?, ?, ?, ?)';
                for (const option of question.options) {
                    await connection.execute(insertOptionQuery, [questionId, option.options_num, option.options_content, option.is_correct]);
                }
            }
        }

        await connection.commit();
        return questionPostId;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
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

const getAllCertificationDetails = async (id) => {
    const query = `
        SELECT
            ci.certificate_id,
            ci.certificate_name,
            qp.question_post_id,
            qp.user_id,
            qp.question_title,
            qp.question_views,
            qp.question_likes,
            qp.question_date,
            qi.question_id,
            qi.question_content,
            qi.question_explanation,
            qi.question_tag,
            qo.options_id,
            qo.options_num,
            qo.options_content,
            qo.is_correct
        FROM certificate_information ci
                 JOIN question_post qp ON ci.certificate_id = qp.certificate_id
                 JOIN question_information qi ON qp.question_post_id = qi.question_post_id
                 LEFT JOIN question_options qo ON qi.question_id = qo.question_id
        WHERE qp.question_post_id = ?
    `;

    const [rows] = await db.execute(query, [id]);
    return rows.length > 0 ? rows : null;
};

module.exports = {
    getAllCertificates,
    getAllCertifications,
    getCertificationById,
    createCertification,
    updateCertification,
    deleteCertification,
    getAllCertificationDetails
};
