import React, { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { colors } from '../../styles/colors';
import './DayCard.css';

const DayCard = ({ dayName, date, tasks, onTaskToggle, onAddTask }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showInput, setShowInput] = useState(false);

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      onAddTask(dayName, date, newTaskTitle);
      setNewTaskTitle('');
      setShowInput(false);
    }
  };

  return (
    <div className="day-card">
      <div className="day-header">
        <div className="day-name">{dayName}</div>
        <div className="day-date">{date}</div>
      </div>

      <div className="progress-circle">
        <CircularProgressbar
          value={progress}
          text={`${progress}%`}
          styles={buildStyles({
            pathColor: colors.primary,
            textColor: colors.text,
            trailColor: colors.incomplete,
            textSize: '20px'
          })}
        />
      </div>

      <div className="task-list">
        <h4>Tasks</h4>
        {tasks.map(task => (
          <div key={task._id} className="task-item">
            <input
              type="checkbox"
              className="task-checkbox"
              checked={task.completed}
              onChange={() => onTaskToggle(task._id, !task.completed)}
            />
            <span className={`task-text ${task.completed ? 'completed' : ''}`}>
              {task.title}
            </span>
          </div>
        ))}

        {showInput ? (
          <div className="add-task-input">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
              placeholder="Enter task..."
              autoFocus
            />
            <button onClick={handleAddTask}>Add</button>
            <button onClick={() => setShowInput(false)}>Cancel</button>
          </div>
        ) : (
          <button className="add-task-btn" onClick={() => setShowInput(true)}>
            + Add Task
          </button>
        )}
      </div>

      <div className="day-status">
        {tasks.length === 0 ? (
          <span className="status-label">Not Completed</span>
        ) : progress === 100 ? (
          <span className="status-label completed-label">Completed ✓</span>
        ) : (
          <span className="status-label">Not Completed</span>
        )}
      </div>
    </div>
  );
};

export default DayCard;
