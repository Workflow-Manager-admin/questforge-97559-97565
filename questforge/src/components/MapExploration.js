import React from 'react';

// PUBLIC_INTERFACE
/**
 * MapExploration component
 * Displays the game map and handles character movement
 * @param {Object} props
 * @param {Object} props.map - The game map data
 * @param {Object} props.character - The player character data
 * @param {Function} props.onMove - Callback function for movement
 * @param {Function} props.onOpenInventory - Callback function to open inventory
 */
const MapExploration = ({ map, character, onMove, onOpenInventory }) => {
  // Helper function to render a single map tile
  const renderTile = (x, y) => {
    const tileKey = `${x},${y}`;
    const isExplored = map.exploredTiles.has(tileKey);
    const isVisible = map.visibleTiles.has(tileKey);
    const isCharacterPosition = character.position.x === x && character.position.y === y;
    
    let tileClass = 'map-tile tile-unexplored';
    let tileContent = null;
    
    if (isExplored || isVisible) {
      const tile = map.tiles[y][x];
      tileClass = `map-tile tile-${tile.type}`;
      
      if (isCharacterPosition) {
        tileContent = <div className="tile-character">@</div>;
      } else if (isVisible) {
        if (tile.hasEnemy) {
          tileClass += ' tile-enemy';
        }
        if (tile.hasItem) {
          tileClass += ' tile-item';
        }
      }
    }
    
    return (
      <div key={`tile-${x}-${y}`} className={tileClass}>
        {tileContent}
      </div>
    );
  };

  // Render the map grid
  const renderMap = () => {
    return Array(map.height).fill().map((_, y) => (
      <div key={`row-${y}`} className="map-row">
        {Array(map.width).fill().map((_, x) => renderTile(x, y))}
      </div>
    ));
  };

  return (
    <div className="map-exploration">
      <div className="map-container">
        {renderMap()}
      </div>
      
      <div className="exploration-controls">
        <div className="map-controls">
          <div className="control-btn" onClick={() => onMove('north')}>↑</div>
          <div className="control-btn" onClick={() => onMove('west')}>←</div>
          <div className="control-btn" onClick={() => {}} style={{ cursor: 'default' }}>●</div>
          <div className="control-btn" onClick={() => onMove('east')}>→</div>
          <div className="control-btn" onClick={() => onMove('south')}>↓</div>
        </div>
        
        <button className="btn" onClick={onOpenInventory}>
          Open Inventory
        </button>
      </div>
      
      <div className="character-position">
        Position: ({character.position.x}, {character.position.y})
      </div>
    </div>
  );
};

export default MapExploration;
