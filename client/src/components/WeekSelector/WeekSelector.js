import React from 'react';
import { formatDate } from '../../utils/dateHelpers';
import './WeekSelector.css';

const WeekSelector = ({ weekStart, onPrevWeek, onNextWeek }) => {
  return (
    <div className="week-selector">
      <button onClick={onPrevWeek} className="week-nav-btn">← Previous Week</button>
      <div className="week-display">
        <span className="week-label">Start of the week:</span>
        <span className="week-date">{formatDate(weekStart)}</span>
      </div>
      <button onClick={onNextWeek} className="week-nav-btn">Next Week →</button>
    </div>
  );
};

export default WeekSelector;
