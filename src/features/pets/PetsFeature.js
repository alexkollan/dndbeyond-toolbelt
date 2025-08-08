import PetsModal from './PetsModal.js';

class PetsFeature {
  constructor() {
    this.name = 'Pets';
    this.description = 'Manage pet and summon stat blocks with scaling and UI controls';
    this.initialized = false;
    this.modal = null;
    this.toolbeltButton = null;
  }

  init() {
    if (this.initialized) return;
    
    console.log('🐾 Pets feature initializing...');
    this.injectStyles();
    this.createModal();
    this.addToolbeltButton();
    
    this.initialized = true;
    console.log('🐾 Pets feature initialized');
  }

  disable() {
    if (!this.initialized) return;
    
    this.removeToolbeltButton();
    this.destroyModal();
    this.removeStyles();
    
    this.initialized = false;
    console.log('🐾 Pets feature disabled');
  }

  onTabChange(currentUrl) {
    if (!this.initialized) return;
    
    // The Pets feature doesn't need specific tab behavior
    // It's available on all D&D Beyond pages
    console.log('Pets feature: Tab changed to', currentUrl);
  }

  injectStyles() {
    if (document.getElementById('pets-feature-styles')) return;
    
    // Inject styles directly to avoid webpack dynamic loading issues
    const style = document.createElement('style');
    style.id = 'pets-feature-styles';
    style.textContent = `
      /* Pets Modal Styles */
      .pets-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      .pets-modal-content {
        background: #1e1e1e;
        border: 1px solid #444;
        border-radius: 8px;
        width: 90vw;
        max-width: 1200px;
        height: 80vh;
        max-height: 800px;
        display: flex;
        flex-direction: column;
        color: #e0e0e0;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
        overflow: hidden;
      }

      .pets-modal.minimized .pets-modal-content {
        height: auto;
        max-height: none;
      }

      .pets-modal.maximized {
        align-items: stretch;
        justify-content: stretch;
      }

      .pets-modal.maximized .pets-modal-content {
        width: 100vw;
        height: 100vh;
        max-width: none;
        max-height: none;
        border-radius: 0;
      }

      /* Modal Header */
      .pets-modal-header {
        background: #2d2d2d;
        border-bottom: 1px solid #444;
        padding: 12px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: grab;
        user-select: none;
      }

      .pets-modal-header:active {
        cursor: grabbing;
      }

      .pets-modal-title h2 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: #e0e0e0;
      }

      .pets-modal-controls {
        display: flex;
        gap: 8px;
      }

      .pets-modal-btn {
        background: #444;
        border: 1px solid #666;
        border-radius: 4px;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: #e0e0e0;
        font-size: 14px;
        transition: all 0.2s ease;
      }

      .pets-modal-btn:hover {
        background: #555;
        border-color: #777;
      }

      .pets-modal-btn:active {
        background: #333;
        transform: scale(0.95);
      }

      .close-btn:hover {
        background: #cc4125;
        border-color: #cc4125;
      }

      /* Modal Body */
      .pets-modal-body {
        flex: 1;
        display: flex;
        overflow: hidden;
      }

      .pets-sidebar {
        width: 300px;
        background: #2a2a2a;
        border-right: 1px solid #444;
        padding: 16px;
        overflow-y: auto;
      }

      .pets-sidebar h3 {
        margin: 0 0 16px 0;
        font-size: 16px;
        color: #e0e0e0;
        border-bottom: 1px solid #444;
        padding-bottom: 8px;
      }

      .spell-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .spell-item {
        background: #1e1e1e;
        border: 1px solid #444;
        border-radius: 6px;
        padding: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .spell-item:hover {
        background: #333;
        border-color: #666;
      }

      .spell-item.selected {
        background: #0d7377;
        border-color: #14a085;
      }

      .spell-item h4 {
        margin: 0 0 6px 0;
        font-size: 14px;
        font-weight: 600;
        color: #e0e0e0;
      }

      .spell-description {
        margin: 0 0 8px 0;
        font-size: 12px;
        color: #b0b0b0;
        line-height: 1.4;
      }

      .spell-meta {
        display: flex;
        justify-content: space-between;
        font-size: 11px;
        color: #888;
      }

      .spell-level {
        background: #444;
        padding: 2px 6px;
        border-radius: 3px;
      }

      /* Main Content */
      .pets-main-content {
        flex: 1;
        padding: 16px;
        overflow-y: auto;
        background: #1a1a1a;
      }

      .pets-welcome {
        text-align: center;
        padding: 40px 20px;
        color: #b0b0b0;
      }

      .pets-welcome h3 {
        margin: 0 0 16px 0;
        color: #e0e0e0;
      }

      /* Pet Options */
      .pet-options {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .pet-option {
        background: #2a2a2a;
        border: 1px solid #444;
        border-radius: 6px;
        overflow: hidden;
        transition: all 0.2s ease;
      }

      .pet-option:hover {
        border-color: #666;
      }

      .pet-option.expanded {
        border-color: #0d7377;
      }

      .pet-option-header {
        padding: 12px 16px;
        background: #333;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        user-select: none;
      }

      .pet-option-header h4 {
        margin: 0;
        color: #e0e0e0;
        font-size: 16px;
      }

      .pet-option-content {
        display: none;
        padding: 16px;
        background: #1e1e1e;
      }

      /* Pet Stat Blocks */
      .pet-stat-block {
        font-family: 'Georgia', serif;
        line-height: 1.5;
      }

      .pet-header {
        margin-bottom: 12px;
        border-bottom: 2px solid #8B0000;
        padding-bottom: 8px;
      }

      .pet-name {
        margin: 0 0 4px 0;
        font-size: 20px;
        font-weight: bold;
        color: #e0e0e0;
      }

      .pet-type {
        font-style: italic;
        color: #b0b0b0;
        font-size: 14px;
      }

      .stat-line {
        margin-bottom: 4px;
        font-size: 14px;
      }

      .stat-line strong {
        color: #e0e0e0;
      }

      /* Ability Scores */
      .ability-scores {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 8px;
        margin: 12px 0;
        padding: 12px;
        background: #333;
        border-radius: 4px;
      }

      .ability-score {
        text-align: center;
      }

      .ability-name {
        font-size: 12px;
        font-weight: bold;
        color: #b0b0b0;
        margin-bottom: 4px;
      }

      .ability-value {
        font-size: 14px;
        color: #e0e0e0;
      }

      /* Pet Abilities and Actions */
      .pet-abilities,
      .pet-actions {
        margin-top: 12px;
      }

      .pet-abilities h4,
      .pet-actions h4 {
        margin: 0 0 8px 0;
        color: #e0e0e0;
        font-size: 16px;
        border-bottom: 1px solid #8B0000;
        padding-bottom: 4px;
      }

      .ability,
      .action {
        margin-bottom: 8px;
        font-size: 14px;
        color: #d0d0d0;
      }

      .ability strong,
      .action strong {
        color: #e0e0e0;
      }

      /* Modal Footer */
      .pets-modal-footer {
        background: #2d2d2d;
        border-top: 1px solid #444;
        padding: 12px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .pets-modal-status {
        font-size: 12px;
        color: #b0b0b0;
      }

      /* Toolbelt Floating Button */
      .pets-floating-btn {
        font-family: 'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif !important;
      }
      
      .pets-floating-btn:hover {
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4) !important;
      }
      
      .pets-floating-btn:active {
        transform: scale(0.95) !important;
      }

      /* Responsive Design */
      @media (max-width: 768px) {
        .pets-modal-content {
          width: 95vw;
          height: 90vh;
        }
        
        .pets-modal-body {
          flex-direction: column;
        }
        
        .pets-sidebar {
          width: 100%;
          max-height: 200px;
          border-right: none;
          border-bottom: 1px solid #444;
        }
        
        .ability-scores {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      /* Pet Header Controls */
      .pet-option-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
      }

      .pet-header-main {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
      }

      .pet-header-controls {
        display: flex;
        gap: 8px;
      }

      /* Active Pet Cards Styles */
      .active-pet-card {
        position: fixed;
        background: linear-gradient(135deg, #f9f5f0 0%, #f4ede4 100%);
        border: 2px solid #8b4513;
        border-radius: 8px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        font-family: 'Roboto Condensed', Arial, sans-serif;
        user-select: none;
        overflow: hidden;
        backdrop-filter: blur(10px);
        min-width: 250px;
        min-height: 300px;
        max-width: 600px;
        max-height: 800px;
        z-index: 1000;
        display: flex;
        flex-direction: column;
      }

      .active-pet-card.minimized {
        width: 80px !important;
        height: 60px !important;
        min-width: 80px;
        min-height: 60px;
        border-radius: 12px;
        cursor: pointer;
        transition: transform 0.2s ease;
      }

      .active-pet-card.minimized:hover {
        transform: scale(1.05);
      }

      /* Active Pet Header */
      .active-pet-header {
        background: linear-gradient(135deg, #c41e3a 0%, #8b2635 100%);
        color: white;
        padding: 8px 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: grab;
        border-bottom: 2px solid #8b4513;
        flex-shrink: 0;
      }

      .active-pet-header:active {
        cursor: grabbing;
      }

      .active-pet-title h3 {
        margin: 0;
        font-size: 16px;
        font-weight: bold;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
      }

      .active-pet-title .pet-type {
        font-size: 12px;
        opacity: 0.9;
        font-style: italic;
      }

      .active-pet-controls {
        display: flex;
        gap: 4px;
      }

      .active-pet-btn {
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: white;
        width: 24px;
        height: 24px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s ease;
      }

      .active-pet-btn:hover {
        background: rgba(255, 255, 255, 0.3);
      }

      /* HP Section */
      .active-pet-hp-section {
        padding: 12px;
        border-bottom: 1px solid #d2b48c;
        background: rgba(255, 255, 255, 0.5);
        flex-shrink: 0;
      }

      .hp-display {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
      }

      .hp-current {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 18px;
        font-weight: bold;
      }

      .hp-input {
        width: 50px;
        padding: 4px;
        border: 1px solid #8b4513;
        border-radius: 4px;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        background: white;
      }

      .hp-separator {
        color: #8b4513;
        font-size: 20px;
      }

      .hp-max {
        color: #2e7d32;
        font-size: 18px;
      }

      .hp-temp {
        color: #1976d2;
        font-size: 14px;
        background: rgba(25, 118, 210, 0.1);
        padding: 2px 6px;
        border-radius: 4px;
        border: 1px solid #1976d2;
      }

      .hp-bar {
        width: 100%;
        height: 8px;
        background: #e0e0e0;
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 12px;
        border: 1px solid #8b4513;
      }

      .hp-bar-fill {
        height: 100%;
        transition: width 0.3s ease, background-color 0.3s ease;
      }

      .hp-controls {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 8px;
        margin-bottom: 8px;
      }

      .hp-control-group {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .hp-control-group label {
        font-size: 12px;
        font-weight: bold;
        color: #8b4513;
      }

      .hp-control-group input {
        padding: 4px;
        border: 1px solid #8b4513;
        border-radius: 4px;
        font-size: 12px;
      }

      .hp-control-group button {
        padding: 4px 8px;
        background: #c41e3a;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 12px;
        cursor: pointer;
        font-weight: bold;
        transition: background-color 0.2s ease;
      }

      .hp-control-group button:hover {
        background: #8b2635;
      }

      .hp-quick-buttons {
        display: flex;
        gap: 4px;
        justify-content: center;
      }

      .quick-hp-btn {
        padding: 4px 8px;
        background: #8b4513;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 12px;
        font-weight: bold;
        cursor: pointer;
        min-width: 32px;
        transition: background-color 0.2s ease;
      }

      .quick-hp-btn:hover {
        background: #a0522d;
      }

      /* Stats Section */
      .active-pet-stats {
        padding: 12px;
        overflow-y: auto;
        flex: 1;
        background: rgba(255, 255, 255, 0.3);
      }

      /* Override pet stat block styles for active cards */
      .active-pet-card .pet-stat-block {
        background: transparent;
        border: none;
        box-shadow: none;
        margin: 0;
      }

      .active-pet-card .pet-header h3 {
        color: #8b4513;
        font-size: 16px;
        margin-bottom: 4px;
      }

      .active-pet-card .pet-type {
        color: #666;
        font-size: 12px;
        font-style: italic;
      }

      .active-pet-card .ability-scores {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
        margin: 12px 0;
      }

      .active-pet-card .ability-score {
        text-align: center;
        background: rgba(255, 255, 255, 0.7);
        border: 1px solid #8b4513;
        border-radius: 4px;
        padding: 6px 4px;
      }

      .active-pet-card .ability-name {
        font-size: 10px;
        font-weight: bold;
        color: #8b4513;
        margin-bottom: 2px;
      }

      .active-pet-card .ability-value {
        font-size: 12px;
        font-weight: bold;
        color: #333;
      }

      .active-pet-card .stat-line {
        font-size: 12px;
        margin: 4px 0;
        line-height: 1.3;
      }

      .active-pet-card .stat-line strong {
        color: #8b4513;
      }

      /* Resize Handles */
      .resize-handle {
        position: absolute;
        background: transparent;
        z-index: 10;
      }

      .resize-n, .resize-s {
        width: 100%;
        height: 8px;
        cursor: ns-resize;
      }

      .resize-e, .resize-w {
        width: 8px;
        height: 100%;
        cursor: ew-resize;
      }

      .resize-n { top: -4px; left: 0; }
      .resize-s { bottom: -4px; left: 0; }
      .resize-e { top: 0; right: -4px; }
      .resize-w { top: 0; left: -4px; }

      .resize-ne, .resize-nw, .resize-se, .resize-sw {
        width: 12px;
        height: 12px;
      }

      .resize-ne { top: -6px; right: -6px; cursor: nesw-resize; }
      .resize-nw { top: -6px; left: -6px; cursor: nwse-resize; }
      .resize-se { bottom: -6px; right: -6px; cursor: nwse-resize; }
      .resize-sw { bottom: -6px; left: -6px; cursor: nesw-resize; }

      /* Minimized Card Styles */
      .minimized-pet-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        padding: 4px;
        position: relative;
      }

      .minimized-pet-name {
        font-size: 10px;
        font-weight: bold;
        color: #8b4513;
        text-align: center;
        line-height: 1;
        margin-bottom: 2px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 70px;
      }

      .minimized-hp-bar {
        width: 60px;
        height: 4px;
        background: #e0e0e0;
        border-radius: 2px;
        overflow: hidden;
        margin: 2px 0;
        border: 1px solid #8b4513;
      }

      .minimized-hp-fill {
        height: 100%;
        transition: width 0.3s ease;
        background: #4CAF50;
      }

      .minimized-hp-text {
        font-size: 8px;
        color: #666;
        line-height: 1;
      }

      .minimized-close-btn {
        position: absolute;
        top: -2px;
        right: -2px;
        width: 16px;
        height: 16px;
        background: #c41e3a;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 10px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.2s ease;
      }

      .active-pet-card.minimized:hover .minimized-close-btn {
        opacity: 1;
      }

      /* Minimized pet floating button */
      .active-pet-minimized {
        position: fixed;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
        border: 3px solid #fff;
        color: white;
        cursor: pointer;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .active-pet-minimized:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
      }

      .active-pet-minimized:hover .minimized-pet-tooltip {
        display: block;
      }

      .minimized-pet-icon {
        font-size: 24px;
      }

      .minimized-pet-tooltip {
        display: none;
        position: absolute;
        bottom: 70px;
        right: 0;
        background-color: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        white-space: nowrap;
        font-size: 12px;
        pointer-events: none;
        z-index: 10001;
      }

      .tooltip-name {
        font-weight: bold;
        margin-bottom: 4px;
      }

      .tooltip-hp {
        color: #4fc3f7;
      }

      /* Resize handles */
      .resize-handle {
        position: absolute;
        background-color: transparent;
        z-index: 10;
      }

      .resize-handle:hover {
        background-color: rgba(79, 195, 247, 0.3);
      }

      .resize-n, .resize-s {
        left: 10%;
        right: 10%;
        height: 10px;
        cursor: ns-resize;
      }

      .resize-n { top: -5px; }
      .resize-s { bottom: -5px; }

      .resize-e, .resize-w {
        top: 10%;
        bottom: 10%;
        width: 10px;
        cursor: ew-resize;
      }

      .resize-e { right: -5px; }
      .resize-w { left: -5px; }

      .resize-ne, .resize-se, .resize-sw, .resize-nw {
        width: 20px;
        height: 20px;
      }

      .resize-ne {
        top: -10px;
        right: -10px;
        cursor: nesw-resize;
      }

      .resize-se {
        bottom: -10px;
        right: -10px;
        cursor: nwse-resize;
      }

      .resize-sw {
        bottom: -10px;
        left: -10px;
        cursor: nesw-resize;
      }

      .resize-nw {
        top: -10px;
        left: -10px;
        cursor: nwse-resize;
      }

      .active-pet-card.resizing {
        opacity: 0.8;
        user-select: none;
      }

      /* Add button styles for activating pets */
      .activate-pet-btn {
        background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }

      .activate-pet-btn:hover {
        background: linear-gradient(135deg, #45a049 0%, #3d8b40 100%);
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
      }

      .activate-pet-btn:active {
        transform: translateY(0);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }

      /* Pet option active indicator */
      .pet-option.has-active-pets {
        border-left: 4px solid #4CAF50;
      }

      .pet-option.has-active-pets .pet-option-header {
        background: linear-gradient(to right, rgba(76, 175, 80, 0.1), transparent);
      }

      .active-pets-indicator {
        display: inline-block;
        background: #4CAF50;
        color: white;
        padding: 2px 6px;
        border-radius: 10px;
        font-size: 10px;
        font-weight: bold;
      }
    `;
    document.head.appendChild(style);
    console.log('🐾 Pets feature styles injected');
  }

  removeStyles() {
    const existingStyles = document.getElementById('pets-feature-styles');
    if (existingStyles) {
      existingStyles.remove();
    }
  }

  createModal() {
    if (this.modal) return;
    
    this.modal = new PetsModal();
  }

  destroyModal() {
    if (this.modal) {
      this.modal.destroy();
      this.modal = null;
    }
  }

  addToolbeltButton() {
    if (this.toolbeltButton) return;
    
    // Create a floating action button for pets
    this.createFloatingButton();
  }

  createFloatingButton() {
    this.toolbeltButton = document.createElement('button');
    this.toolbeltButton.className = 'pets-floating-btn';
    this.toolbeltButton.innerHTML = '🐾';
    this.toolbeltButton.title = 'Open Pet & Summon Manager';
    
    // Position the button in the bottom right corner
    Object.assign(this.toolbeltButton.style, {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      backgroundColor: '#2a2a2a',
      border: '2px solid #444',
      color: '#e0e0e0',
      fontSize: '24px',
      cursor: 'pointer',
      zIndex: '9999',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    });
    
    // Add hover effects
    this.toolbeltButton.addEventListener('mouseenter', () => {
      this.toolbeltButton.style.backgroundColor = '#333';
      this.toolbeltButton.style.borderColor = '#666';
      this.toolbeltButton.style.transform = 'scale(1.1)';
    });
    
    this.toolbeltButton.addEventListener('mouseleave', () => {
      this.toolbeltButton.style.backgroundColor = '#2a2a2a';
      this.toolbeltButton.style.borderColor = '#444';
      this.toolbeltButton.style.transform = 'scale(1)';
    });
    
    this.toolbeltButton.addEventListener('click', () => {
      if (this.modal) {
        this.modal.toggleVisibility();
      }
    });

    document.body.appendChild(this.toolbeltButton);
  }

  removeToolbeltButton() {
    if (this.toolbeltButton) {
      this.toolbeltButton.remove();
      this.toolbeltButton = null;
    }
  }

  // Public API methods
  showModal() {
    if (this.modal) {
      this.modal.show();
    }
  }

  hideModal() {
    if (this.modal) {
      this.modal.hide();
    }
  }

  toggleModal() {
    if (this.modal) {
      this.modal.toggleVisibility();
    }
  }

  isModalVisible() {
    return this.modal ? this.modal.isVisible() : false;
  }

  // Utility methods for external integrations
  getPetData(spellName) {
    // This could be used by other features to get pet data
    try {
      // Import is handled at the top of the file for static analysis
      return null; // Simplified for now
    } catch (error) {
      console.error('Failed to load pet data:', error);
      return null;
    }
  }

  getSupportedSpells() {
    // Return list of supported spells for other features
    return [
      'find-familiar',
      'summon-draconic-spirit',
      'animate-objects',
      'conjure-animals',
      'bigbys-hand',
      'spiritual-weapon'
    ];
  }
}

export default PetsFeature;
