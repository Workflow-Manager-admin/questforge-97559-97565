import React from 'react';

// PUBLIC_INTERFACE
/**
 * StatDisplay component
 * Displays the character's current stats in a compact format
 * @param {Object} props
 * @param {Object} props.character - The player character data
 */
const StatDisplay = ({ character }) => {
  return (
    <div className="stat-display">
      <div className="stat-block">
        <span className="stat-name">LVL:</span>
        <span className="stat-value">{character.level}</span>
      </div>
      
      <div className="stat-block">
        <span className="stat-name">HP:</span>
        <span className="stat-value">{character.health}/{character.maxHealth}</span>
      </div>
      
      <div className="stat-block">
        <span className="stat-name">ATK:</span>
        <span className="stat-value">{character.attack}</span>
      </div>
      
      <div className="stat-block">
        <span className="stat-name">DEF:</span>
        <span className="stat-value">{character.defense}</span>
      </div>
      
      <div className="stat-block">
        <span className="stat-name">XP:</span>
        <span className="stat-value">{character.experience}/{character.level * 100}</span>
      </div>
      
      <div className="stat-block">
        <span className="stat-name">Gold:</span>
        <span className="stat-value">{character.gold}</span>
      </div>
    </div>
  );
};

export default StatDisplay;
