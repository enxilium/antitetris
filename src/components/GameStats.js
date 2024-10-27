import React from "react";

import "./GameStats.css";

const GameStats = ({ gameStats }) => {
  const { level, points, linesCompleted, linesPerLevel } = gameStats;
  const linesToLevel = (linesPerLevel - linesCompleted)*5;

  let designation = "";
  let designationClass = "";

  if (level <= 5) {
    designation = "SAFE";
    designationClass = "safe";
  } else if (level <= 10) {
    designation = "DANGER";
    designationClass = "danger";
  } else {
    designation = "EXTREME DANGER";
    designationClass = "extreme-danger";
  }

  return (
    <ul className="GameStats GameStats__right">
      <li>Status</li>
      <li className={designationClass}>{designation}</li>
      <li>Lines Until Next Classification</li>
      <li className="value">{linesToLevel}</li>
      <li>Points</li>
      <li className="value">{points}</li>
    </ul>
  );
};

export default React.memo(GameStats);