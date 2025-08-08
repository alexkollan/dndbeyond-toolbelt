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
