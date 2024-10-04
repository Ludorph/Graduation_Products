const db = require('../config/db');

const getAllMenu = async () => {
    const query = 'SELECT * FROM major_information';
    const [rows] = await db.execute(query);
    return rows;
};

module.exports = {
    getAllMenu
};