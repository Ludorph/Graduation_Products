const express = require('express');
const router = express.Router();
const majorController = require('../controllers/majorController');

router.get('/', majorController.getAllMajor);
router.get('/:id', majorController.getMajorById);

module.exports = router;
