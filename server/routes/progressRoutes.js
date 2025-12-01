const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');

router.get('/week/:weekStart', progressController.getWeeklyProgress);

module.exports = router;
