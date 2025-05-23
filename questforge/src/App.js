import React, { useState, useEffect } from 'react';
import './App.css';
import './styles/gameStyles.css';
import CharacterCreation from './components/CharacterCreation';
import MapExploration from './components/MapExploration';
import CombatSystem from './components/CombatSystem';
import Inventory from './components/Inventory';
import StatDisplay from './components/StatDisplay';
import GameOver from './components/GameOver';

// PUBLIC_INTERFACE
/**
 * Main container component for QuestForge RPG game
 * Manages game state and renders different game phases
 */
function App() {
  // Game phases: 'character-creation', 'exploration', 'combat', 'inventory', 'game-over'
  const [gamePhase, setGamePhase] = useState('character-creation');
  
  // Character state
  const [character, setCharacter] = useState({
    name: '',
    class: '',
    level: 1,
    health: 100,
    maxHealth: 100,
    attack: 10,
    defense: 5,
    experience: 0,
    gold: 50,
    position: { x: 5, y: 5 } // Starting position on map
  });

  // Map state (simplified for initial implementation)
  const [map, setMap] = useState({
    width: 10,
    height: 10,
    tiles: [], // Will be populated in useEffect
    exploredTiles: new Set(), // Track which tiles have been explored
    visibleTiles: new Set(), // Track which tiles are currently visible
  });

  // Inventory state
  const [inventory, setInventory] = useState({
    items: [], // Array of item objects
    capacity: 10, // Max number of items
  });

  // Combat state
  const [combat, setCombat] = useState({
    inCombat: false,
    enemy: null,
    playerTurn: true,
    combatLog: [],
  });

  // Game message for user feedback
  const [gameMessage, setGameMessage] = useState('Welcome to QuestForge! Create your character to begin your adventure.');

  // Initialize map on component mount
  useEffect(() => {
    // Generate a simple initial map - this would be more complex in a full game
    const newTiles = Array(map.height).fill().map((_, y) => 
      Array(map.width).fill().map((_, x) => ({
        type: Math.random() > 0.2 ? 'grass' : 'forest',
        x,
        y,
        hasEnemy: Math.random() > 0.8,
        hasItem: Math.random() > 0.9,
      }))
    );
    
    // Update map with generated tiles
    setMap(prevMap => ({
      ...prevMap,
      tiles: newTiles
    }));
    
    // Add initial position to explored tiles
    const initialPos = `${character.position.x},${character.position.y}`;
    setMap(prevMap => ({
      ...prevMap,
      exploredTiles: new Set([...prevMap.exploredTiles, initialPos]),
      visibleTiles: calculateVisibleTiles(character.position, newTiles)
    }));
  }, []); // Run only once on mount

  // Helper function to calculate visible tiles based on character position
  const calculateVisibleTiles = (position, tiles) => {
    // Simple visibility: show tiles within 2 spaces of character
    const visibleSet = new Set();
    for (let y = Math.max(0, position.y - 2); y <= Math.min(map.height - 1, position.y + 2); y++) {
      for (let x = Math.max(0, position.x - 2); x <= Math.min(map.width - 1, position.x + 2); x++) {
        visibleSet.add(`${x},${y}`);
      }
    }
    return visibleSet;
  };

  // Function to handle character creation completion
  const handleCharacterCreation = (newCharacter) => {
    setCharacter(prevChar => ({
      ...prevChar,
      ...newCharacter
    }));
    setGamePhase('exploration');
    setGameMessage(`Welcome, ${newCharacter.name} the ${newCharacter.class}! Explore the world, defeat enemies, and collect treasures.`);
  };

  // Function to handle movement on the map
  const handleMove = (direction) => {
    if (gamePhase !== 'exploration') return;
    
    const newPosition = { ...character.position };
    
    // Calculate new position based on direction
    switch (direction) {
      case 'north': 
        if (newPosition.y > 0) newPosition.y -= 1;
        break;
      case 'south': 
        if (newPosition.y < map.height - 1) newPosition.y += 1;
        break;
      case 'west': 
        if (newPosition.x > 0) newPosition.x -= 1;
        break;
      case 'east': 
        if (newPosition.x < map.width - 1) newPosition.x += 1;
        break;
      default:
        return;
    }
    
    // Update character position
    setCharacter(prevChar => ({
      ...prevChar,
      position: newPosition
    }));
    
    // Update explored and visible tiles
    const posKey = `${newPosition.x},${newPosition.y}`;
    setMap(prevMap => {
      const newExploredTiles = new Set([...prevMap.exploredTiles, posKey]);
      const newVisibleTiles = calculateVisibleTiles(newPosition, prevMap.tiles);
      
      return {
        ...prevMap,
        exploredTiles: newExploredTiles,
        visibleTiles: newVisibleTiles
      };
    });
    
    // Check for encounters (enemy or item)
    checkForEncounters(newPosition);
  };

  // Function to check for encounters when moving to a new tile
  const checkForEncounters = (position) => {
    const tile = map.tiles[position.y][position.x];
    
    // Check for enemy encounter
    if (tile.hasEnemy && Math.random() > 0.5) {
      // Generate a random enemy appropriate for the character's level
      const enemy = generateEnemy(character.level);
      
      setCombat({
        inCombat: true,
        enemy,
        playerTurn: true,
        combatLog: [`You encountered a ${enemy.name}!`]
      });
      
      setGamePhase('combat');
      setGameMessage(`A ${enemy.name} appears! Prepare for combat!`);
      
      // Remove the enemy from the tile
      setMap(prevMap => {
        const newTiles = [...prevMap.tiles];
        newTiles[position.y][position.x] = {
          ...newTiles[position.y][position.x],
          hasEnemy: false
        };
        return {
          ...prevMap,
          tiles: newTiles
        };
      });
    }
    
    // Check for item encounter
    if (tile.hasItem) {
      // Generate a random item
      const item = generateItem(character.level);
      
      // Add item to inventory if there's room
      if (inventory.items.length < inventory.capacity) {
        setInventory(prevInventory => ({
          ...prevInventory,
          items: [...prevInventory.items, item]
        }));
        
        setGameMessage(`You found a ${item.name}!`);
      } else {
        setGameMessage(`You found a ${item.name}, but your inventory is full!`);
      }
      
      // Remove the item from the tile
      setMap(prevMap => {
        const newTiles = [...prevMap.tiles];
        newTiles[position.y][position.x] = {
          ...newTiles[position.y][position.x],
          hasItem: false
        };
        return {
          ...prevMap,
          tiles: newTiles
        };
      });
    }
  };

  // Function to generate a random enemy based on character level
  const generateEnemy = (level) => {
    // Simple enemy generation - would be more complex in a full game
    const enemyTypes = [
      { name: 'Goblin', healthMod: 0.8, attackMod: 0.9, defenseMod: 0.7 },
      { name: 'Orc', healthMod: 1.2, attackMod: 1.1, defenseMod: 0.9 },
      { name: 'Troll', healthMod: 1.5, attackMod: 1.3, defenseMod: 1.2 },
      { name: 'Dragon', healthMod: 2.0, attackMod: 1.8, defenseMod: 1.5 }
    ];
    
    const enemyType = enemyTypes[Math.min(Math.floor(Math.random() * (level + 1) / 3), enemyTypes.length - 1)];
    
    return {
      name: enemyType.name,
      health: Math.floor(20 * level * enemyType.healthMod),
      maxHealth: Math.floor(20 * level * enemyType.healthMod),
      attack: Math.floor(5 * level * enemyType.attackMod),
      defense: Math.floor(3 * level * enemyType.defenseMod),
      experience: Math.floor(10 * level * enemyType.healthMod),
      gold: Math.floor(5 * level * (Math.random() + 0.5))
    };
  };

  // Function to generate a random item based on character level
  const generateItem = (level) => {
    const itemTypes = [
      { type: 'weapon', name: 'Sword', statMod: 'attack', value: 5 },
      { type: 'weapon', name: 'Axe', statMod: 'attack', value: 7 },
      { type: 'armor', name: 'Shield', statMod: 'defense', value: 3 },
      { type: 'armor', name: 'Helmet', statMod: 'defense', value: 2 },
      { type: 'potion', name: 'Health Potion', statMod: 'health', value: 20 }
    ];
    
    const randomItem = itemTypes[Math.floor(Math.random() * itemTypes.length)];
    
    return {
      id: Date.now(), // Simple unique ID
      ...randomItem,
      value: Math.floor(randomItem.value * (1 + (level - 1) * 0.2)) // Scale value with level
    };
  };

  // Function to handle combat actions
  const handleCombatAction = (action) => {
    if (gamePhase !== 'combat' || !combat.playerTurn) return;
    
    const newCombatLog = [...combat.combatLog];
    
    if (action === 'attack') {
      // Calculate damage
      const damage = Math.max(1, character.attack - Math.floor(combat.enemy.defense * 0.5));
      const enemyHealth = Math.max(0, combat.enemy.health - damage);
      
      newCombatLog.push(`You attack the ${combat.enemy.name} for ${damage} damage!`);
      
      if (enemyHealth <= 0) {
        // Enemy defeated
        handleEnemyDefeated();
        return;
      } else {
        // Update enemy health and switch to enemy turn
        setCombat(prevCombat => ({
          ...prevCombat,
          enemy: {
            ...prevCombat.enemy,
            health: enemyHealth
          },
          playerTurn: false,
          combatLog: newCombatLog
        }));
        
        // Enemy turn after a short delay
        setTimeout(() => handleEnemyTurn(), 1000);
      }
    } else if (action === 'useItem') {
      setGamePhase('inventory');
      setGameMessage('Select an item to use in combat.');
    } else if (action === 'flee') {
      const fleeChance = 0.5; // 50% chance to flee
      
      if (Math.random() < fleeChance) {
        newCombatLog.push('You successfully fled from combat!');
        
        setCombat({
          inCombat: false,
          enemy: null,
          playerTurn: true,
          combatLog: []
        });
        
        setGamePhase('exploration');
        setGameMessage('You fled from combat.');
      } else {
        newCombatLog.push('You failed to flee!');
        
        setCombat(prevCombat => ({
          ...prevCombat,
          playerTurn: false,
          combatLog: newCombatLog
        }));
        
        // Enemy turn after a short delay
        setTimeout(() => handleEnemyTurn(), 1000);
      }
    }
  };

  // Function to handle enemy turn in combat
  const handleEnemyTurn = () => {
    const damage = Math.max(1, combat.enemy.attack - Math.floor(character.defense * 0.7));
    const playerHealth = Math.max(0, character.health - damage);
    
    const newCombatLog = [...combat.combatLog];
    newCombatLog.push(`The ${combat.enemy.name} attacks you for ${damage} damage!`);
    
    // Update player health
    setCharacter(prevChar => ({
      ...prevChar,
      health: playerHealth
    }));
    
    if (playerHealth <= 0) {
      // Player defeated
      handlePlayerDefeated();
      return;
    } else {
      // Switch back to player turn
      setCombat(prevCombat => ({
        ...prevCombat,
        playerTurn: true,
        combatLog: newCombatLog
      }));
    }
  };

  // Function to handle enemy defeat
  const handleEnemyDefeated = () => {
    const { enemy } = combat;
    const expGained = enemy.experience;
    const goldGained = enemy.gold;
    
    // Update character experience and gold
    const newCharacter = { ...character };
    newCharacter.experience += expGained;
    newCharacter.gold += goldGained;
    
    // Check for level up
    if (newCharacter.experience >= newCharacter.level * 100) {
      newCharacter.level += 1;
      newCharacter.maxHealth += 20;
      newCharacter.health = newCharacter.maxHealth;
      newCharacter.attack += 5;
      newCharacter.defense += 3;
      
      setGameMessage(`Victory! You defeated the ${enemy.name} and gained ${expGained} exp and ${goldGained} gold. You leveled up!`);
    } else {
      setGameMessage(`Victory! You defeated the ${enemy.name} and gained ${expGained} exp and ${goldGained} gold.`);
    }
    
    setCharacter(newCharacter);
    
    // Reset combat state
    setCombat({
      inCombat: false,
      enemy: null,
      playerTurn: true,
      combatLog: []
    });
    
    // Return to exploration
    setGamePhase('exploration');
  };

  // Function to handle player defeat
  const handlePlayerDefeated = () => {
    setGamePhase('game-over');
    setGameMessage(`You were defeated by the ${combat.enemy.name}. Game over!`);
  };

  // Function to use an item from inventory
  const handleUseItem = (itemIndex) => {
    const item = inventory.items[itemIndex];
    
    if (!item) return;
    
    // Apply item effects based on type
    if (item.type === 'potion' && item.statMod === 'health') {
      // Health potion - restore health
      setCharacter(prevChar => ({
        ...prevChar,
        health: Math.min(prevChar.health + item.value, prevChar.maxHealth)
      }));
      
      setGameMessage(`You used ${item.name} and restored ${item.value} health.`);
    } else if (item.type === 'weapon' || item.type === 'armor') {
      // Equipment - would normally equip it, but for simplicity, just apply stat bonus
      setCharacter(prevChar => ({
        ...prevChar,
        [item.statMod]: prevChar[item.statMod] + item.value
      }));
      
      setGameMessage(`You equipped ${item.name} and gained ${item.value} ${item.statMod}.`);
    }
    
    // Remove item from inventory
    setInventory(prevInventory => ({
      ...prevInventory,
      items: prevInventory.items.filter((_, index) => index !== itemIndex)
    }));
    
    // Return to previous phase
    if (combat.inCombat) {
      setGamePhase('combat');
      
      // Enemy turn after using item in combat
      setCombat(prevCombat => ({
        ...prevCombat,
        playerTurn: false,
        combatLog: [...prevCombat.combatLog, `You used ${item.name}.`]
      }));
      
      setTimeout(() => handleEnemyTurn(), 1000);
    } else {
      setGamePhase('exploration');
    }
  };

  // Function to restart the game
  const handleRestartGame = () => {
    // Reset all game state
    setGamePhase('character-creation');
    setCharacter({
      name: '',
      class: '',
      level: 1,
      health: 100,
      maxHealth: 100,
      attack: 10,
      defense: 5,
      experience: 0,
      gold: 50,
      position: { x: 5, y: 5 }
    });
    setInventory({
      items: [],
      capacity: 10
    });
    setCombat({
      inCombat: false,
      enemy: null,
      playerTurn: true,
      combatLog: []
    });
    
    // Generate a new map
    const newTiles = Array(map.height).fill().map((_, y) => 
      Array(map.width).fill().map((_, x) => ({
        type: Math.random() > 0.2 ? 'grass' : 'forest',
        x,
        y,
        hasEnemy: Math.random() > 0.8,
        hasItem: Math.random() > 0.9,
      }))
    );
    
    setMap({
      ...map,
      tiles: newTiles,
      exploredTiles: new Set(),
      visibleTiles: new Set()
    });
    
    setGameMessage('Welcome to QuestForge! Create your character to begin your adventure.');
  };

  // Open inventory screen
  const handleOpenInventory = () => {
    if (gamePhase === 'exploration') {
      setGamePhase('inventory');
      setGameMessage('Inventory opened. Select an item to use it.');
    }
  };

  // Close inventory and return to previous screen
  const handleCloseInventory = () => {
    setGamePhase('exploration');
  };

  // Render the appropriate game component based on the current phase
  const renderGameContent = () => {
    switch (gamePhase) {
      case 'character-creation':
        return <CharacterCreation onComplete={handleCharacterCreation} />;
      case 'exploration':
        return (
          <MapExploration
            map={map}
            character={character}
            onMove={handleMove}
            onOpenInventory={handleOpenInventory}
          />
        );
      case 'combat':
        return (
          <CombatSystem
            character={character}
            enemy={combat.enemy}
            combatLog={combat.combatLog}
            playerTurn={combat.playerTurn}
            onAction={handleCombatAction}
          />
        );
      case 'inventory':
        return (
          <Inventory
            items={inventory.items}
            capacity={inventory.capacity}
            onUseItem={handleUseItem}
            onClose={handleCloseInventory}
            inCombat={combat.inCombat}
          />
        );
      case 'game-over':
        return <GameOver character={character} onRestart={handleRestartGame} />;
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <div className="app game-container">
      <header className="game-header">
        <h1>QuestForge</h1>
        {gamePhase !== 'character-creation' && gamePhase !== 'game-over' && (
          <StatDisplay character={character} />
        )}
      </header>

      <main className="game-main">
        <div className="game-message">{gameMessage}</div>
        {renderGameContent()}
      </main>

      <footer className="game-footer">
        <div className="footer-content">QuestForge - A Simple React RPG</div>
      </footer>
    </div>
  );
}

export default App;
