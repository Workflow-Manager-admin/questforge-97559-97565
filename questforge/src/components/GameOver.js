import React from 'react';

// PUBLIC_INTERFACE
/**
 * GameOver component
 * Displayed when the game ends, showing stats and allowing restart
 * @param {Object} props
 * @param {Object} props.character - The player character data
 * @param {Function} props.onRestart - Callback function to restart the game
 */
const GameOver = ({ character, onRestart }) => {
  return (
    <div className="game-over">
      <h2>Game Over</h2>
      
      <div className="stats-summary">
        <p>Name: {character.name}</p>
        <p>Class: {character.class}</p>
        <p>Level: {character.level}</p>
        <p>Experience: {character.experience}</p>
        <p>Gold collected: {character.gold}</p>
      </div>
      
      <p>Your adventure has come to an end. Will you try again?</p>
      
      <button className="btn btn-large" onClick={onRestart}>
        Start New Adventure
      </button>
    </div>
  );
};

export default GameOver;
