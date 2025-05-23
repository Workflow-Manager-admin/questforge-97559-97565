# QuestForge

QuestForge is a simple turn-based RPG (Role-Playing Game) built with React. Players can create characters, explore a map, battle enemies, collect items, and level up in this lightweight browser-based adventure game.

![QuestForge RPG Game](https://via.placeholder.com/800x400?text=QuestForge+RPG+Game)

## Features

- **Character Creation**: Choose your character name and select from different classes (Warrior, Mage, Rogue), each with unique stats
- **Map Exploration**: Navigate a procedurally generated map with different terrain types
- **Combat System**: Turn-based combat with enemies that scale in difficulty based on character level
- **Inventory Management**: Collect and use items like weapons, armor, and health potions
- **Progression System**: Gain experience and gold from defeating enemies, level up to increase stats
- **Game State Management**: Multiple game phases including exploration, combat, inventory, and game over

## Table of Contents

1. [Installation](#installation)
2. [Running the Application](#running-the-application)
3. [Game Instructions](#game-instructions)
4. [Testing](#testing)
5. [Project Structure](#project-structure)
6. [Technologies Used](#technologies-used)
7. [Contributing](#contributing)

## Installation

To set up the QuestForge project locally:

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/questforge.git
   cd questforge
   ```

2. Install dependencies:
   ```
   npm install
   ```

   or if you prefer using Yarn:
   ```
   yarn
   ```

## Running the Application

### Development Mode

To run the application in development mode:

```
npm start
```

This will start the development server. Open [http://localhost:3000](http://localhost:3000) in your browser to play the game.

### Production Build

To create a production build:

```
npm run build
```

This builds the app for production to the `build` folder, optimizing performance for deployment.

You can serve the production build locally with a static server:

```
npm install -g serve
serve -s build
```

## Game Instructions

### Character Creation
- Choose a character name
- Select a character class (Warrior, Mage, or Rogue)
- Each class has different starting stats for health, attack, and defense

### Map Navigation
- Use the directional controls (↑, ←, →, ↓) to move your character
- Explore the map to discover items and encounter enemies
- Green tiles represent grass, darker green tiles represent forest

### Combat
- When encountering an enemy, combat begins automatically
- Choose between attacking, using an item, or attempting to flee
- Combat is turn-based: you act first, then the enemy responds
- Defeat enemies to gain experience and gold

### Inventory
- Access your inventory during exploration or combat
- Use items to restore health or boost stats
- Your inventory has a maximum capacity of 10 items

### Leveling Up
- Gain experience points by defeating enemies
- Level up when reaching experience thresholds (100 XP for level 2, etc.)
- Leveling up increases health, attack, and defense

## Testing

QuestForge includes a test suite built with Jest and React Testing Library. To run the tests:

```
npm test
```

This launches the test runner in interactive watch mode.

For running tests in CI environments or for a single run:

```
CI=true npm test
```

## Project Structure

```
questforge/
├── src/                  # Source code
│   ├── components/       # React components
│   │   ├── CharacterCreation.js
│   │   ├── CombatSystem.js
│   │   ├── GameOver.js
│   │   ├── Inventory.js
│   │   ├── MapExploration.js
│   │   └── StatDisplay.js
│   ├── styles/           # CSS styles
│   │   └── gameStyles.css
│   ├── App.js            # Main application component
│   ├── App.css           # Application styles
│   ├── index.js          # Entry point
│   └── index.css         # Base styles
├── public/               # Static files
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```

## Technologies Used

- [React](https://reactjs.org/) - UI library
- [React Scripts](https://create-react-app.dev/) - Development toolchain
- CSS - Styling (no external UI frameworks)

## Contributing

Contributions to QuestForge are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Created as part of the KAVIA code generation project.
