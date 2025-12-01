const Habit = require('../models/Habit');

// Get all habits for user
exports.getHabits = async (req, res) => {
  try {
    const { userId } = req.query;
    const habits = await Habit.find({ userId });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new habit
exports.createHabit = async (req, res) => {
  try {
    const habit = new Habit(req.body);
    await habit.save();
    res.status(201).json(habit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Toggle habit completion for a date
exports.toggleHabitCompletion = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.body;
    
    const habit = await Habit.findById(id);
    const existingDate = habit.completedDates.find(d => d.date === date);
    
    if (existingDate) {
      habit.completedDates = habit.completedDates.filter(d => d.date !== date);
    } else {
      habit.completedDates.push({ date });
    }
    
    await habit.save();
    res.json(habit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
