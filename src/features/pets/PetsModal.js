import PetTemplates from './petTemplates.js';
import petsData from './petsData.js';

class PetsModal {
  constructor() {
    this.modal = null;
    this.currentSpell = null;
    this.currentLevel = null;
    this.isMinimized = false;
    this.dragData = {
      isDragging: false,
      startX: 0,
      startY: 0,
      startLeft: 0,
      startTop: 0
    };
  }

  show() {
    if (this.modal) {
      this.modal.style.display = 'flex';
      return;
    }

    this.createModal();
    this.attachEventListeners();
    this.loadSpellList();
    this.modal.style.display = 'flex';
  }

  hide() {
    if (this.modal) {
      this.modal.style.display = 'none';
    }
  }

  destroy() {
    if (this.modal) {
      this.modal.remove();
      this.modal = null;
      this.currentSpell = null;
      this.currentLevel = null;
    }
  }

  createModal() {
    this.modal = document.createElement('div');
    this.modal.className = 'pets-modal';
    this.modal.innerHTML = `
      <div class="pets-modal-content">
        <div class="pets-modal-header">
          <div class="pets-modal-title">
            <h2>Pet & Summon Manager</h2>
          </div>
          <div class="pets-modal-controls">
            <button class="pets-modal-btn minimize-btn" title="Minimize">
              <span class="minimize-icon">−</span>
            </button>
            <button class="pets-modal-btn maximize-btn" title="Maximize/Restore">
              <span class="maximize-icon">⬜</span>
            </button>
            <button class="pets-modal-btn close-btn" title="Close">
              <span class="close-icon">×</span>
            </button>
          </div>
        </div>
        
        <div class="pets-modal-body">
          <div class="pets-sidebar">
            <h3>Available Spells</h3>
            <div class="spell-list">
              <!-- Spell list will be populated here -->
            </div>
          </div>
          
          <div class="pets-main-content">
            <div class="pets-welcome">
              <h3>Welcome to Pet Manager</h3>
              <p>Select a spell from the sidebar to view available pets and summons.</p>
              <div class="pets-welcome-features">
                <h4>Features:</h4>
                <ul>
                  <li>📋 Complete stat blocks for all pets and summons</li>
                  <li>📊 Automatic scaling based on spell level</li>
                  <li>🎯 Optimized for D&D Beyond integration</li>
                  <li>📱 Draggable and resizable interface</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div class="pets-modal-footer">
          <div class="pets-modal-status">
            <span id="pets-status-text">Ready</span>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(this.modal);
  }

  attachEventListeners() {
    const header = this.modal.querySelector('.pets-modal-header');
    const minimizeBtn = this.modal.querySelector('.minimize-btn');
    const maximizeBtn = this.modal.querySelector('.maximize-btn');
    const closeBtn = this.modal.querySelector('.close-btn');

    // Make modal draggable
    header.addEventListener('mousedown', this.startDrag.bind(this));
    document.addEventListener('mousemove', this.drag.bind(this));
    document.addEventListener('mouseup', this.stopDrag.bind(this));

    // Control buttons
    minimizeBtn.addEventListener('click', this.toggleMinimize.bind(this));
    maximizeBtn.addEventListener('click', this.toggleMaximize.bind(this));
    closeBtn.addEventListener('click', this.hide.bind(this));

    // Prevent dragging when clicking on control buttons
    [minimizeBtn, maximizeBtn, closeBtn].forEach(btn => {
      btn.addEventListener('mousedown', (e) => e.stopPropagation());
    });

    // Close modal when clicking outside
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.hide();
      }
    });

    // Prevent modal from closing when clicking inside content
    this.modal.querySelector('.pets-modal-content').addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  startDrag(e) {
    if (this.modal.classList.contains('maximized')) return;
    
    this.dragData.isDragging = true;
    this.dragData.startX = e.clientX;
    this.dragData.startY = e.clientY;
    
    const rect = this.modal.getBoundingClientRect();
    this.dragData.startLeft = rect.left;
    this.dragData.startTop = rect.top;
    
    this.modal.style.cursor = 'grabbing';
    e.preventDefault();
  }

  drag(e) {
    if (!this.dragData.isDragging) return;
    
    const deltaX = e.clientX - this.dragData.startX;
    const deltaY = e.clientY - this.dragData.startY;
    
    const newLeft = this.dragData.startLeft + deltaX;
    const newTop = this.dragData.startTop + deltaY;
    
    // Keep modal within viewport bounds
    const modalRect = this.modal.getBoundingClientRect();
    const maxLeft = window.innerWidth - modalRect.width;
    const maxTop = window.innerHeight - modalRect.height;
    
    this.modal.style.left = Math.max(0, Math.min(newLeft, maxLeft)) + 'px';
    this.modal.style.top = Math.max(0, Math.min(newTop, maxTop)) + 'px';
    this.modal.style.right = 'auto';
    this.modal.style.bottom = 'auto';
  }

  stopDrag() {
    this.dragData.isDragging = false;
    this.modal.style.cursor = 'default';
  }

  toggleMinimize() {
    const body = this.modal.querySelector('.pets-modal-body');
    const footer = this.modal.querySelector('.pets-modal-footer');
    const minimizeIcon = this.modal.querySelector('.minimize-icon');
    
    this.isMinimized = !this.isMinimized;
    
    if (this.isMinimized) {
      body.style.display = 'none';
      footer.style.display = 'none';
      minimizeIcon.textContent = '+';
      this.modal.classList.add('minimized');
    } else {
      body.style.display = 'flex';
      footer.style.display = 'block';
      minimizeIcon.textContent = '−';
      this.modal.classList.remove('minimized');
    }
  }

  toggleMaximize() {
    const maximizeIcon = this.modal.querySelector('.maximize-icon');
    
    if (this.modal.classList.contains('maximized')) {
      this.modal.classList.remove('maximized');
      maximizeIcon.textContent = '⬜';
    } else {
      this.modal.classList.add('maximized');
      maximizeIcon.textContent = '⬟';
    }
  }

  loadSpellList() {
    const spellList = this.modal.querySelector('.spell-list');
    
    spellList.innerHTML = Object.entries(petsData).map(([spellKey, spellData]) => `
      <div class="spell-item" data-spell="${spellKey}">
        <div class="spell-item-content">
          <h4>${spellData.name}</h4>
          <p class="spell-description">${spellData.description}</p>
          <div class="spell-meta">
            <span class="spell-level">Level ${spellData.summonLevel}</span>
            <span class="creature-count">${spellData.options.length} option${spellData.options.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>
    `).join('');

    // Add click handlers for spell items
    spellList.addEventListener('click', (e) => {
      const spellItem = e.target.closest('.spell-item');
      if (spellItem) {
        this.selectSpell(spellItem.dataset.spell);
      }
    });
  }

  selectSpell(spellKey) {
    // Remove previous selection
    this.modal.querySelectorAll('.spell-item').forEach(item => {
      item.classList.remove('selected');
    });

    // Add selection to clicked item
    const selectedItem = this.modal.querySelector(`[data-spell="${spellKey}"]`);
    if (selectedItem) {
      selectedItem.classList.add('selected');
    }

    this.currentSpell = spellKey;
    this.loadSpellDetails(spellKey);
    this.updateStatus(`Loaded ${petsData[spellKey].name}`);
  }

  loadSpellDetails(spellKey) {
    const spellData = petsData[spellKey];
    const mainContent = this.modal.querySelector('.pets-main-content');
    
    mainContent.innerHTML = `
      <div class="spell-details">
        <div class="spell-header">
          <h2>${spellData.name}</h2>
          <p class="spell-description">${spellData.description}</p>
          ${PetTemplates.renderSpellLevelSelector(spellData)}
        </div>
        
        <div class="pets-container">
          ${PetTemplates.renderPetOptions(spellData)}
        </div>
      </div>
    `;

    // Add event listener for spell level selector
    const levelSelect = mainContent.querySelector('#spell-level-select');
    if (levelSelect) {
      levelSelect.addEventListener('change', (e) => {
        this.updateSpellLevel(parseInt(e.target.value));
      });
    }

    // Add click handlers for pet options
    mainContent.addEventListener('click', (e) => {
      const petOption = e.target.closest('.pet-option');
      if (petOption) {
        this.togglePetDetails(petOption);
      }
    });
  }

  updateSpellLevel(newLevel) {
    this.currentLevel = newLevel;
    const spellData = petsData[this.currentSpell];
    const petsContainer = this.modal.querySelector('.pets-container');
    
    petsContainer.innerHTML = PetTemplates.renderPetOptions(spellData, newLevel);
    this.updateStatus(`Updated to spell level ${newLevel}`);
  }

  togglePetDetails(petOption) {
    const content = petOption.querySelector('.pet-option-content');
    const isExpanded = petOption.classList.contains('expanded');
    
    // Collapse all other pet options
    this.modal.querySelectorAll('.pet-option').forEach(option => {
      option.classList.remove('expanded');
      option.querySelector('.pet-option-content').style.display = 'none';
    });
    
    if (!isExpanded) {
      petOption.classList.add('expanded');
      content.style.display = 'block';
    }
  }

  updateStatus(message) {
    const statusText = this.modal.querySelector('#pets-status-text');
    if (statusText) {
      statusText.textContent = message;
      
      // Clear status after 3 seconds
      setTimeout(() => {
        if (statusText.textContent === message) {
          statusText.textContent = 'Ready';
        }
      }, 3000);
    }
  }

  // Public API methods
  isVisible() {
    return this.modal && this.modal.style.display !== 'none';
  }

  toggleVisibility() {
    if (this.isVisible()) {
      this.hide();
    } else {
      this.show();
    }
  }
}

export default PetsModal;
