const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');

router.get('/', habitController.getHabits);
router.post('/', habitController.createHabit);
router.put('/:id/toggle', habitController.toggleHabitCompletion);

module.exports = router;
