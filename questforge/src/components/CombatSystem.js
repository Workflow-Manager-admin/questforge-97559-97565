import React from 'react';

// PUBLIC_INTERFACE
/**
 * CombatSystem component
 * Handles the turn-based combat between the player and enemies
 * @param {Object} props
 * @param {Object} props.character - The player character data
 * @param {Object} props.enemy - The enemy data
 * @param {Array} props.combatLog - Array of combat messages
 * @param {boolean} props.playerTurn - Whether it's the player's turn
 * @param {Function} props.onAction - Callback function for combat actions
 */
const CombatSystem = ({ character, enemy, combatLog, playerTurn, onAction }) => {
  // Calculate health percentage for health bars
  const characterHealthPercent = (character.health / character.maxHealth) * 100;
  const enemyHealthPercent = (enemy.health / enemy.maxHealth) * 100;
  
  return (
    <div className="combat-container">
      <div className="combat-entities">
        <div className="entity-card">
          <h3>{character.name} (You)</h3>
          <div>Health: {character.health}/{character.maxHealth}</div>
          <div className="health-bar">
            <div 
              className="health-fill" 
              style={{ width: `${characterHealthPercent}%`, backgroundColor: '#2ecc71' }}
            ></div>
          </div>
          <div>Attack: {character.attack}</div>
          <div>Defense: {character.defense}</div>
        </div>
        
        <div className="entity-card">
          <h3>{enemy.name}</h3>
          <div>Health: {enemy.health}/{enemy.maxHealth}</div>
          <div className="health-bar">
            <div 
              className="health-fill" 
              style={{ width: `${enemyHealthPercent}%` }}
            ></div>
          </div>
          <div>Attack: {enemy.attack}</div>
          <div>Defense: {enemy.defense}</div>
        </div>
      </div>
      
      <div className="combat-log">
        {combatLog.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      
      <div className="combat-actions">
        <button 
          className="combat-action attack" 
          onClick={() => onAction('attack')}
          disabled={!playerTurn}
        >
          Attack
        </button>
        <button 
          className="combat-action item" 
          onClick={() => onAction('useItem')}
          disabled={!playerTurn}
        >
          Use Item
        </button>
        <button 
          className="combat-action flee" 
          onClick={() => onAction('flee')}
          disabled={!playerTurn}
        >
          Flee
        </button>
      </div>
      
      {!playerTurn && <div className="turn-indicator">Enemy's turn...</div>}
    </div>
  );
};

export default CombatSystem;
