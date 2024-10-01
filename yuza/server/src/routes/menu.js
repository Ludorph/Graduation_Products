const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
// const pool = require('../db-config');

router.get('/', menuController.getAllMenu);
// router.get('/:id', menuController.getMajorInfo);
router.get('/major-info/:majorId', async (req, res) => {
    try {
        const [rows] = await pool.execute(
            'SELECT m.major_name, c.certificate_name FROM major_information m LEFT JOIN certificate_information c ON m.major_id = c.major_id WHERE m.major_id = ?',
            [req.params.majorId]
        );
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
