import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { colors } from '../../styles/colors';
import './OverallProgress.css';

const OverallProgress = ({ progress, completedTasks, totalTasks }) => {
  return (
    <div className="overall-progress">
      <h3>Overall Progress</h3>
      <div className="progress-display">
        <div className="progress-circle-large">
          <CircularProgressbar
            value={progress}
            text={`${progress}%`}
            styles={buildStyles({
              pathColor: colors.primary,
              textColor: colors.text,
              trailColor: colors.incomplete,
              textSize: '24px'
            })}
          />
        </div>
        <div className="progress-stats">
          <p>{completedTasks} / {totalTasks} Completed</p>
        </div>
      </div>
    </div>
  );
};

export default OverallProgress;
