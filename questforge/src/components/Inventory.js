import React from 'react';

// PUBLIC_INTERFACE
/**
 * Inventory component
 * Displays and manages the player's inventory
 * @param {Object} props
 * @param {Array} props.items - Array of inventory items
 * @param {number} props.capacity - Maximum inventory capacity
 * @param {Function} props.onUseItem - Callback function when using an item
 * @param {Function} props.onClose - Callback function to close the inventory
 * @param {boolean} props.inCombat - Whether the player is currently in combat
 */
const Inventory = ({ items, capacity, onUseItem, onClose, inCombat }) => {
  return (
    <div className="inventory-container">
      <div className="inventory-header">
        <h2>Inventory</h2>
        <span className="inventory-capacity">{items.length}/{capacity}</span>
      </div>
      
      {items.length > 0 ? (
        <div className="inventory-grid">
          {items.map((item, index) => (
            <div 
              key={item.id} 
              className={`inventory-item item-${item.type}`}
              onClick={() => onUseItem(index)}
            >
              <h4>{item.name}</h4>
              <div className="item-stats">
                {item.statMod === 'attack' && `+${item.value} Attack`}
                {item.statMod === 'defense' && `+${item.value} Defense`}
                {item.statMod === 'health' && `+${item.value} Health`}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="inventory-empty">Your inventory is empty.</div>
      )}
      
      <div className="inventory-actions">
        <button className="btn" onClick={onClose}>
          {inCombat ? "Back to Combat" : "Close Inventory"}
        </button>
      </div>
    </div>
  );
};

export default Inventory;
