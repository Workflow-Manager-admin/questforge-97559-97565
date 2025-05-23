import React, { useState } from 'react';

// PUBLIC_INTERFACE
/**
 * CharacterCreation component
 * Allows the player to create their character by selecting a name and class
 * @param {Object} props
 * @param {Function} props.onComplete - Callback function called when character creation is complete
 */
const CharacterCreation = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [characterClass, setCharacterClass] = useState('');
  const [error, setError] = useState('');

  const characterClasses = [
    {
      id: 'warrior',
      name: 'Warrior',
      description: 'Strong and brave, warriors excel in combat with high health and attack.',
      stats: { health: 120, attack: 15, defense: 8 }
    },
    {
      id: 'mage',
      name: 'Mage',
      description: 'Masters of arcane arts, mages deal high damage but have lower health.',
      stats: { health: 80, attack: 20, defense: 3 }
    },
    {
      id: 'rogue',
      name: 'Rogue',
      description: 'Quick and cunning, rogues are balanced with moderate stats.',
      stats: { health: 90, attack: 12, defense: 6 }
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!name.trim()) {
      setError('Please enter a character name.');
      return;
    }
    
    if (!characterClass) {
      setError('Please select a character class.');
      return;
    }
    
    // Find the selected class data
    const selectedClass = characterClasses.find(c => c.id === characterClass);
    
    // Create character data to pass to parent component
    const newCharacter = {
      name: name.trim(),
      class: selectedClass.name,
      health: selectedClass.stats.health,
      maxHealth: selectedClass.stats.health,
      attack: selectedClass.stats.attack,
      defense: selectedClass.stats.defense
    };
    
    // Call the onComplete callback with the new character data
    onComplete(newCharacter);
  };

  return (
    <div className="character-creation">
      <h2>Create Your Character</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Character Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your character's name"
          />
        </div>
        
        <div className="form-group">
          <label>Character Class</label>
          <div className="class-options">
            {characterClasses.map(classOption => (
              <div
                key={classOption.id}
                className={`class-option ${characterClass === classOption.id ? 'selected' : ''}`}
                onClick={() => setCharacterClass(classOption.id)}
              >
                <h3>{classOption.name}</h3>
                <p>{classOption.description}</p>
                <div className="class-stats">
                  <div>Health: {classOption.stats.health}</div>
                  <div>Attack: {classOption.stats.attack}</div>
                  <div>Defense: {classOption.stats.defense}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <button type="submit" className="btn btn-large">
          Begin Adventure
        </button>
      </form>
    </div>
  );
};

export default CharacterCreation;
