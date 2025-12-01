import React from 'react';
import './ProgressChart.css';

const ProgressChart = ({ dailyProgress }) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="progress-chart">
      <h4>Weekly Overview</h4>
      <div className="chart-container">
        {days.map((day, index) => {
          const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][index];
          const progress = dailyProgress[dayName] || 0;
          
          return (
            <div key={day} className="chart-bar">
              <div className="bar-container">
                <div 
                  className="bar-fill"
                  style={{ height: `${progress}%` }}
                >
                  <span className="bar-label">{progress}%</span>
                </div>
              </div>
              <div className="bar-day">{day}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressChart;
