import React, { useState, useEffect } from 'react';
import { habitAPI } from '../../services/api';
import './HabitTracker.css';

const HabitTracker = ({ weekStart }) => {
  const [habits, setHabits] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const data = await habitAPI.getHabits();
      setHabits(data);
    } catch (error) {
      console.error('Error fetching habits:', error);
    }
  };

  const handleAddHabit = async () => {
    if (newHabitName.trim()) {
      try {
        await habitAPI.createHabit({
          name: newHabitName,
          completedDates: []
        });
        setNewHabitName('');
        setShowAddForm(false);
        await fetchHabits();
      } catch (error) {
        console.error('Error adding habit:', error);
      }
    }
  };

  const handleToggleHabit = async (habitId, date) => {
    try {
      await habitAPI.toggleHabitCompletion(habitId, date);
      await fetchHabits();
    } catch (error) {
      console.error('Error toggling habit:', error);
    }
  };

  const getWeekDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const isHabitCompletedOnDate = (habit, date) => {
    return habit.completedDates.some(d => d.date === date);
  };

  const calculateProgress = (habit) => {
    const weekDates = getWeekDates();
    const completed = weekDates.filter(date => 
      isHabitCompletedOnDate(habit, date)
    ).length;
    return Math.round((completed / 7) * 100);
  };

  const weekDates = getWeekDates();

  return (
    <div className="habit-tracker">
      <div className="habit-header">
        <h3>Habit Tracker</h3>
        <button 
          className="add-habit-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          + Add Habit
        </button>
      </div>

      {showAddForm && (
        <div className="add-habit-form">
          <input
            type="text"
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddHabit()}
            placeholder="Enter habit name..."
            autoFocus
          />
          <div className="form-actions">
            <button onClick={handleAddHabit} className="save-btn">Save</button>
            <button onClick={() => setShowAddForm(false)} className="cancel-btn">Cancel</button>
          </div>
        </div>
      )}

      <div className="habit-table">
        <div className="habit-table-header">
          <div className="habit-name-col">Habit</div>
          {daysOfWeek.map((day, index) => (
            <div key={index} className="habit-day-col">{day}</div>
          ))}
          <div className="habit-progress-col">Progress</div>
        </div>

        {habits.length === 0 ? (
          <div className="no-habits">
            <p>No habits yet. Click "+ Add Habit" to get started!</p>
          </div>
        ) : (
          habits.map(habit => (
            <div key={habit._id} className="habit-row">
              <div className="habit-name">{habit.name}</div>
              {weekDates.map((date, index) => (
                <div key={index} className="habit-checkbox-cell">
                  <input
                    type="checkbox"
                    checked={isHabitCompletedOnDate(habit, date)}
                    onChange={() => handleToggleHabit(habit._id, date)}
                    className="habit-checkbox"
                  />
                </div>
              ))}
              <div className="habit-progress">
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar-fill"
                    style={{ width: `${calculateProgress(habit)}%` }}
                  ></div>
                </div>
                <span className="progress-text">{calculateProgress(habit)}%</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HabitTracker;
