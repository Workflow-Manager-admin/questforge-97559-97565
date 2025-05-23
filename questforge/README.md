# QuestForge - A React RPG Game

QuestForge is a browser-based role-playing game built with React. This simple yet engaging RPG features character creation, map exploration, turn-based combat, inventory management, and character progression.

## Game Features

- **Character Creation**: Choose from three character classes (Warrior, Mage, Rogue) with unique stats
- **Map Exploration**: Navigate a procedurally generated map, discover items, and encounter enemies
- **Combat System**: Engage in turn-based battles with enemies that scale with your level
- **Inventory Management**: Collect and use weapons, armor, and potions to help in your quest
- **Progression System**: Gain experience and gold from defeating enemies and level up to increase stats
- **Game Phases**: 
  - Character creation
  - Map exploration
  - Combat
  - Inventory management
  - Game over screen with the option to start a new adventure

## Getting Started

In the project directory, you can run:

### `npm install`

Installs all the dependencies required for the game to run.

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## How to Play

1. **Create Your Character**:
   - Enter a name for your character
   - Select a class (Warrior, Mage, or Rogue)
   - Each class has different starting stats affecting health, attack, and defense

2. **Explore the Map**:
   - Use the directional controls to move around the map
   - Grass tiles are light green, forest tiles are darker green
   - Enemy locations are marked with special indicators when visible
   - Items are shown with a different indicator on the map

3. **Combat**:
   - When you encounter an enemy, combat begins automatically
   - Choose your action: Attack, Use Item, or Flee
   - Combat is turn-based - you act first, then the enemy responds
   - Defeating enemies grants experience and gold

4. **Inventory Management**:
   - Open your inventory during exploration or combat
   - Use items to restore health or boost stats
   - Your inventory has a maximum capacity of 10 items

5. **Leveling Up**:
   - Gain experience points by defeating enemies
   - When you reach enough XP (level × 100), you'll level up automatically
   - Leveling up increases your health, attack, and defense stats

## Project Structure

The game is built with a component-based architecture:

- `App.js` - Main game container that manages game state and phases
- `CharacterCreation.js` - Character creation interface
- `MapExploration.js` - Map navigation and exploration
- `CombatSystem.js` - Turn-based combat interface
- `Inventory.js` - Inventory management
- `StatDisplay.js` - Character statistics display
- `GameOver.js` - Game over screen with restart option

## Customization

The game uses CSS variables for easy styling customization. The main styles are defined in:

- `src/App.css` - General application styles and theme colors
- `src/styles/gameStyles.css` - Game-specific component styles

## Learn More

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To learn more about React, check out the [React documentation](https://reactjs.org/).
