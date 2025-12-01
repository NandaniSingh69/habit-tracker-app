const Task = require('../models/Task');
const Habit = require('../models/Habit');

// Calculate weekly progress
exports.getWeeklyProgress = async (req, res) => {
  try {
    const { weekStart } = req.params;
    const { userId } = req.query;
    
    // Get all tasks for the week
    const tasks = await Task.find({
      userId,
      date: { $gte: weekStart }
    });
    
    // Calculate daily progress
    const dailyProgress = {};
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    days.forEach(day => {
      const dayTasks = tasks.filter(t => t.dayOfWeek === day);
      const completed = dayTasks.filter(t => t.completed).length;
      const total = dayTasks.length;
      dailyProgress[day] = total > 0 ? Math.round((completed / total) * 100) : 0;
    });
    
    // Calculate overall progress
    const totalCompleted = tasks.filter(t => t.completed).length;
    const totalTasks = tasks.length;
    const overallProgress = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;
    
    res.json({
      dailyProgress,
      overallProgress,
      completedTasks: totalCompleted,
      totalTasks
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
