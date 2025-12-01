import React, { useState, useEffect, useCallback } from 'react';
import WeekSelector from '../WeekSelector/WeekSelector';
import OverallProgress from '../OverallProgress/OverallProgress';
import DayCard from '../DayCard/DayCard';
import HabitTracker from '../HabitTracker/HabitTracker';
import Toast from '../Toast/Toast';
import { taskAPI, progressAPI } from '../../services/api';
import { getWeekStart, getWeekDates } from '../../utils/dateHelpers';
import '../../styles/Dashboard.css';
import ProgressChart from '../ProgressChart/ProgressChart';

const Dashboard = () => {
  const [weekStart, setWeekStart] = useState(getWeekStart());
  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState({
    dailyProgress: {},
    overallProgress: 0,
    completedTasks: 0,
    totalTasks: 0
  });
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const weekDates = getWeekDates(weekStart);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  // Wrap fetchData in useCallback to prevent recreation on every render
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [tasksData, progressData] = await Promise.all([
        taskAPI.getWeeklyTasks(weekStart),
        progressAPI.getWeeklyProgress(weekStart)
      ]);
      setTasks(tasksData);
      setProgress(progressData);
    } catch (error) {
      console.error('Error fetching data:', error);
      showToast('Failed to load data', 'error');
    } finally {
      setLoading(false);
    }
  }, [weekStart, showToast]); // Dependencies: weekStart and showToast

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Now fetchData is properly included

  const handlePrevWeek = () => {
    const prevWeek = new Date(weekStart);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setWeekStart(prevWeek.toISOString().split('T')[0]);
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(weekStart);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setWeekStart(nextWeek.toISOString().split('T')[0]);
  };

  const handleTaskToggle = async (taskId, completed) => {
    try {
      await taskAPI.updateTask(taskId, completed);
      await fetchData();
      showToast(completed ? 'Task completed! 🎉' : 'Task marked incomplete');
    } catch (error) {
      console.error('Error updating task:', error);
      showToast('Failed to update task', 'error');
    }
  };

  const handleAddTask = async (dayName, date, title) => {
    try {
      await taskAPI.createTask({
        title,
        date,
        dayOfWeek: dayName,
        completed: false
      });
      await fetchData();
      showToast('Task added successfully! ✓');
    } catch (error) {
      console.error('Error adding task:', error);
      showToast('Failed to add task', 'error');
    }
  };

  const getTasksForDay = (dayName) => {
    return tasks.filter(task => task.dayOfWeek === dayName);
  };

  if (loading) {
  return (
    <div className="loading">
      <div className="loading-spinner"></div>
      <div className="loading-text">Loading your productivity dashboard...</div>
    </div>
  );
}


  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <p className="quote">"Inspiration comes only during work"</p>
        <WeekSelector
          weekStart={weekStart}
          onPrevWeek={handlePrevWeek}
          onNextWeek={handleNextWeek}
        />
      </div>

      <div className="main-content">
        <div className="week-overview">
          <h2>Weekly Tasks</h2>
          <ProgressChart dailyProgress={progress.dailyProgress} />
          <div className="days-grid">
            {weekDates.map(day => (
              <DayCard
                key={day.dayName}
                dayName={day.dayName}
                date={day.displayDate}
                tasks={getTasksForDay(day.dayName)}
                onTaskToggle={handleTaskToggle}
                onAddTask={handleAddTask}
              />
            ))}
          </div>
        </div>

        <div className="sidebar">
          <OverallProgress
            progress={progress.overallProgress}
            completedTasks={progress.completedTasks}
            totalTasks={progress.totalTasks}
          />
          <HabitTracker weekStart={weekStart} />
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
