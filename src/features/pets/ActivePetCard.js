import PetTemplates from './petTemplates.js';
import petsData from './petsData.js';

class ActivePetCard {
  constructor(petData, manager) {
    this.id = petData.id;
    this.manager = manager;
    this.petData = petData;
    this.card = null;
    this.isMinimized = petData.isMinimized || false;
    this.isDragging = false;
    this.isResizing = false;
    this.dragData = {};
    this.resizeData = {};
    
    this.render();
    this.setupEventListeners();
    this.restorePosition();
  }

  render() {
    const spellData = petsData[this.petData.spellKey];
    const pet = spellData?.options[this.petData.petIndex];
    
    if (!pet) {
      console.error('Pet data not found for active pet:', this.petData);
      return;
    }

    this.card = document.createElement('div');
    this.card.className = 'active-pet-card';
    this.card.setAttribute('data-pet-id', this.id);
    this.card.style.zIndex = this.petData.zIndex || 1000;

    if (this.isMinimized) {
      this.renderMinimized();
    } else {
      this.renderFull(pet, spellData);
    }

    document.body.appendChild(this.card);
  }

  renderFull(pet, spellData) {
    const stats = this.petData.stats;
    const hpPercentage = Math.max(0, (stats.currentHp / stats.maxHp) * 100);
    const hpBarColor = hpPercentage > 60 ? '#4CAF50' : hpPercentage > 30 ? '#FF9800' : '#F44336';

    this.card.innerHTML = `
      <div class="active-pet-header">
        <div class="active-pet-title">
          <h3>${this.petData.instanceName}</h3>
          <span class="pet-type">${pet.size} ${pet.type}</span>
        </div>
        <div class="active-pet-controls">
          <button class="active-pet-btn minimize-btn" title="Minimize">−</button>
          <button class="active-pet-btn close-btn" title="Close">×</button>
        </div>
      </div>

      <div class="active-pet-hp-section">
        <div class="hp-display">
          <div class="hp-current">
            <input type="number" 
                   class="hp-input" 
                   value="${stats.currentHp}" 
                   min="0" 
                   max="${stats.maxHp + (stats.tempHp || 0)}"
                   title="Current HP">
            <span class="hp-separator">/</span>
            <span class="hp-max">${stats.maxHp}</span>
            ${stats.tempHp ? `<span class="hp-temp">+${stats.tempHp}</span>` : ''}
          </div>
        </div>
        <div class="hp-bar">
          <div class="hp-bar-fill" style="width: ${hpPercentage}%; background-color: ${hpBarColor};"></div>
        </div>
        <div class="hp-controls">
          <div class="hp-control-group">
            <label>Damage:</label>
            <input type="number" class="damage-input" min="0" placeholder="0">
            <button class="apply-damage-btn">Apply</button>
          </div>
          <div class="hp-control-group">
            <label>Heal:</label>
            <input type="number" class="heal-input" min="0" placeholder="0">
            <button class="apply-heal-btn">Apply</button>
          </div>
          <div class="hp-control-group">
            <label>Temp HP:</label>
            <input type="number" class="temp-hp-input" min="0" placeholder="0" value="${stats.tempHp || 0}">
            <button class="apply-temp-hp-btn">Set</button>
          </div>
        </div>
        <div class="hp-quick-buttons">
          <button class="quick-hp-btn" data-value="-5">-5</button>
          <button class="quick-hp-btn" data-value="-1">-1</button>
          <button class="quick-hp-btn" data-value="+1">+1</button>
          <button class="quick-hp-btn" data-value="+5">+5</button>
        </div>
      </div>

      <div class="active-pet-stats">
        ${PetTemplates.renderStatBlock(pet, this.petData.spellLevel || spellData.summonLevel, spellData.summonLevel)}
      </div>

      <!-- Resize handles -->
      <div class="resize-handle resize-n" data-direction="n"></div>
      <div class="resize-handle resize-ne" data-direction="ne"></div>
      <div class="resize-handle resize-e" data-direction="e"></div>
      <div class="resize-handle resize-se" data-direction="se"></div>
      <div class="resize-handle resize-s" data-direction="s"></div>
      <div class="resize-handle resize-sw" data-direction="sw"></div>
      <div class="resize-handle resize-w" data-direction="w"></div>
      <div class="resize-handle resize-nw" data-direction="nw"></div>
    `;

    // Apply saved size if available
    if (this.petData.size) {
      this.card.style.width = this.petData.size.width + 'px';
      this.card.style.height = this.petData.size.height + 'px';
    } else {
      this.card.style.width = '320px';
      this.card.style.height = '500px';
    }
  }

  renderMinimized() {
    const stats = this.petData.stats;
    const hpPercentage = Math.max(0, (stats.currentHp / stats.maxHp) * 100);
    
    this.card.className = 'active-pet-card minimized';
    this.card.innerHTML = `
      <div class="minimized-pet-content">
        <div class="minimized-pet-name">${this.petData.instanceName.split(' ')[0]}</div>
        <div class="minimized-hp-bar">
          <div class="minimized-hp-fill" style="width: ${hpPercentage}%;"></div>
        </div>
        <div class="minimized-hp-text">${stats.currentHp}/${stats.maxHp}</div>
        <button class="minimized-close-btn">×</button>
      </div>
    `;
    
    this.card.style.width = '80px';
    this.card.style.height = '60px';
  }

  setupEventListeners() {
    // Header dragging
    const header = this.card.querySelector('.active-pet-header');
    if (header) {
      header.addEventListener('mousedown', this.startDrag.bind(this));
    }

    // Control buttons
    const minimizeBtn = this.card.querySelector('.minimize-btn');
    const closeBtn = this.card.querySelector('.close-btn, .minimized-close-btn');
    
    if (minimizeBtn) {
      minimizeBtn.addEventListener('click', this.toggleMinimize.bind(this));
    }
    
    if (closeBtn) {
      closeBtn.addEventListener('click', this.close.bind(this));
    }

    // HP controls
    this.setupHPControls();

    // Resize handles
    this.setupResizeHandles();

    // Click to restore minimized
    if (this.isMinimized) {
      this.card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('minimized-close-btn')) {
          this.restore();
        }
      });
    }

    // Bring to front on click
    this.card.addEventListener('mousedown', this.bringToFront.bind(this));

    // Global mouse events
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    document.addEventListener('mouseup', this.handleMouseUp.bind(this));
  }

  setupHPControls() {
    // HP input direct editing
    const hpInput = this.card.querySelector('.hp-input');
    if (hpInput) {
      hpInput.addEventListener('change', (e) => {
        const newHp = Math.max(0, parseInt(e.target.value) || 0);
        this.updateHP({ currentHp: newHp });
      });
    }

    // Damage/Heal/Temp HP buttons
    const damageBtn = this.card.querySelector('.apply-damage-btn');
    const healBtn = this.card.querySelector('.apply-heal-btn');
    const tempHpBtn = this.card.querySelector('.apply-temp-hp-btn');

    if (damageBtn) {
      damageBtn.addEventListener('click', () => {
        const damageInput = this.card.querySelector('.damage-input');
        const damage = parseInt(damageInput.value) || 0;
        if (damage > 0) {
          this.applyDamage(damage);
          damageInput.value = '';
        }
      });
    }

    if (healBtn) {
      healBtn.addEventListener('click', () => {
        const healInput = this.card.querySelector('.heal-input');
        const healing = parseInt(healInput.value) || 0;
        if (healing > 0) {
          this.applyHealing(healing);
          healInput.value = '';
        }
      });
    }

    if (tempHpBtn) {
      tempHpBtn.addEventListener('click', () => {
        const tempHpInput = this.card.querySelector('.temp-hp-input');
        const tempHp = Math.max(0, parseInt(tempHpInput.value) || 0);
        this.updateHP({ tempHp });
      });
    }

    // Quick HP buttons
    const quickButtons = this.card.querySelectorAll('.quick-hp-btn');
    quickButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const value = parseInt(btn.dataset.value);
        if (value < 0) {
          this.applyDamage(Math.abs(value));
        } else {
          this.applyHealing(value);
        }
      });
    });
  }

  setupResizeHandles() {
    const handles = this.card.querySelectorAll('.resize-handle');
    handles.forEach(handle => {
      handle.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        this.startResize(e, handle.dataset.direction);
      });
    });
  }

  startDrag(e) {
    if (this.isMinimized) return;
    
    this.isDragging = true;
    this.dragData = {
      startX: e.clientX,
      startY: e.clientY,
      startLeft: this.card.offsetLeft,
      startTop: this.card.offsetTop
    };
    
    this.card.style.cursor = 'grabbing';
    e.preventDefault();
  }

  startResize(e, direction) {
    if (this.isMinimized) return;
    
    e.preventDefault();
    e.stopPropagation(); // Prevent drag from starting
    
    this.isResizing = true;
    this.resizeData = {
      direction,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: this.card.offsetWidth,
      startHeight: this.card.offsetHeight,
      startLeft: this.card.offsetLeft,
      startTop: this.card.offsetTop
    };
    
    document.body.style.cursor = this.getResizeCursor(direction);
    this.card.classList.add('resizing');
  }

  handleMouseMove(e) {
    if (this.isDragging) {
      this.handleDrag(e);
    } else if (this.isResizing) {
      this.handleResize(e);
    }
  }

  handleMouseUp() {
    if (this.isDragging) {
      this.stopDrag();
    } else if (this.isResizing) {
      this.stopResize();
    }
  }

  handleDrag(e) {
    const deltaX = e.clientX - this.dragData.startX;
    const deltaY = e.clientY - this.dragData.startY;
    
    let newLeft = this.dragData.startLeft + deltaX;
    let newTop = this.dragData.startTop + deltaY;
    
    // Keep within viewport
    newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - this.card.offsetWidth));
    newTop = Math.max(0, Math.min(newTop, window.innerHeight - this.card.offsetHeight));
    
    this.card.style.left = newLeft + 'px';
    this.card.style.top = newTop + 'px';
  }

  handleResize(e) {
    const deltaX = e.clientX - this.resizeData.startX;
    const deltaY = e.clientY - this.resizeData.startY;
    const direction = this.resizeData.direction;
    
    let newWidth = this.resizeData.startWidth;
    let newHeight = this.resizeData.startHeight;
    let newLeft = this.resizeData.startLeft;
    let newTop = this.resizeData.startTop;

    // Apply resize based on direction
    if (direction.includes('e')) newWidth += deltaX;
    if (direction.includes('w')) {
      newWidth -= deltaX;
      newLeft += deltaX;
    }
    if (direction.includes('s')) newHeight += deltaY;
    if (direction.includes('n')) {
      newHeight -= deltaY;
      newTop += deltaY;
    }

    // Enforce minimum size
    newWidth = Math.max(250, newWidth);
    newHeight = Math.max(300, newHeight);
    
    // Enforce maximum size
    newWidth = Math.min(600, newWidth);
    newHeight = Math.min(800, newHeight);

    // Recalculate position if size was constrained and we're resizing from top/left
    if (direction.includes('w') && newWidth === 250) {
      newLeft = this.resizeData.startLeft + (this.resizeData.startWidth - 250);
    } else if (direction.includes('w')) {
      newLeft = this.resizeData.startLeft + (this.resizeData.startWidth - newWidth);
    }
    
    if (direction.includes('n') && newHeight === 300) {
      newTop = this.resizeData.startTop + (this.resizeData.startHeight - 300);
    } else if (direction.includes('n')) {
      newTop = this.resizeData.startTop + (this.resizeData.startHeight - newHeight);
    }

    // Keep within viewport bounds
    newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - newWidth));
    newTop = Math.max(0, Math.min(newTop, window.innerHeight - newHeight));

    // Apply new dimensions and position
    this.card.style.width = newWidth + 'px';
    this.card.style.height = newHeight + 'px';
    this.card.style.left = newLeft + 'px';
    this.card.style.top = newTop + 'px';
    
    // Update petData for persistence
    this.petData.size = { width: newWidth, height: newHeight };
    this.petData.position = { x: newLeft, y: newTop };
  }

  stopDrag() {
    this.isDragging = false;
    this.card.style.cursor = 'default';
    this.savePosition();
  }

  stopResize() {
    this.isResizing = false;
    document.body.style.cursor = 'default';
    this.card.classList.remove('resizing');
    this.manager.saveState();
  }

  getResizeCursor(direction) {
    const cursors = {
      'n': 'ns-resize',
      'ne': 'nesw-resize',
      'e': 'ew-resize',
      'se': 'nwse-resize',
      's': 'ns-resize',
      'sw': 'nesw-resize',
      'w': 'ew-resize',
      'nw': 'nwse-resize'
    };
    return cursors[direction] || 'default';
  }

  bringToFront() {
    const newZIndex = this.manager.getNextZIndex();
    this.card.style.zIndex = newZIndex;
    this.petData.zIndex = newZIndex;
    this.manager.updatePetData(this.id, { zIndex: newZIndex });
  }

  toggleMinimize() {
    if (this.isMinimized) {
      this.restore();
    } else {
      this.minimize();
    }
  }

  minimize() {
    if (this.isMinimized) return;
    
    // Store current position and size before minimizing
    const rect = this.card.getBoundingClientRect();
    this.petData.position = { x: rect.left, y: rect.top };
    this.petData.size = { width: rect.width, height: rect.height };
    
    this.isMinimized = true;
    this.petData.isMinimized = true;
    
    // Hide the main card
    this.card.style.display = 'none';
    
    // Create minimized floating circle
    this.createMinimizedButton();
    
    this.manager.saveState();
  }

  createMinimizedButton() {
    // Remove existing minimized button if any
    if (this.minimizedButton) {
      this.minimizedButton.remove();
    }
    
    this.minimizedButton = document.createElement('div');
    this.minimizedButton.className = 'active-pet-minimized';
    this.minimizedButton.innerHTML = `
      <div class="minimized-pet-icon">🐾</div>
      <div class="minimized-pet-tooltip">
        <div class="tooltip-name">${this.petData.instanceName}</div>
        <div class="tooltip-hp">HP: ${this.petData.stats.currentHp}/${this.petData.stats.maxHp}</div>
      </div>
    `;
    
    // Position the minimized button
    const index = this.manager.getMinimizedIndex(this.petData.id);
    const row = Math.floor(index / 4);
    const col = index % 4;
    
    // Position relative to bottom-right corner
    const bottom = 90 + (row * 70); // Start 90px from bottom, 70px spacing
    const right = 20 + (col * 70); // Start 20px from right, 70px spacing
    
    this.minimizedButton.style.bottom = `${bottom}px`;
    this.minimizedButton.style.right = `${right}px`;
    
    // Add click handler to restore
    this.minimizedButton.addEventListener('click', () => this.restore());
    
    document.body.appendChild(this.minimizedButton);
  }

  restore() {
    if (!this.isMinimized) return;
    
    this.isMinimized = false;
    this.petData.isMinimized = false;
    
    // Remove minimized button
    if (this.minimizedButton) {
      this.minimizedButton.remove();
      this.minimizedButton = null;
    }
    
    // Restore the card
    this.card.style.display = 'block';
    
    // Restore position if available
    if (this.petData.position) {
      this.card.style.left = `${this.petData.position.x}px`;
      this.card.style.top = `${this.petData.position.y}px`;
    }
    
    // Restore size if available
    if (this.petData.size) {
      this.card.style.width = `${this.petData.size.width}px`;
      this.card.style.height = `${this.petData.size.height}px`;
    }
    
    this.manager.saveState();
    this.manager.updateMinimizedPositions();
  }

  close() {
    this.destroy();
    this.manager.deactivatePet(this.id);
  }

  applyDamage(damage) {
    const stats = this.petData.stats;
    let remainingDamage = damage;
    
    // First, reduce temp HP
    if (stats.tempHp > 0) {
      const tempHpReduction = Math.min(stats.tempHp, remainingDamage);
      stats.tempHp -= tempHpReduction;
      remainingDamage -= tempHpReduction;
    }
    
    // Then reduce current HP
    stats.currentHp = Math.max(0, stats.currentHp - remainingDamage);
    
    this.updateHP(stats);
  }

  applyHealing(healing) {
    const stats = this.petData.stats;
    stats.currentHp = Math.min(stats.maxHp, stats.currentHp + healing);
    this.updateHP(stats);
  }

  updateHP(newStats) {
    this.petData.stats = { ...this.petData.stats, ...newStats };
    this.manager.updatePetData(this.id, { stats: this.petData.stats });
    
    // Update UI elements
    this.updateHPDisplay();
  }

  updateHPDisplay() {
    const stats = this.petData.stats;
    const hpInput = this.card.querySelector('.hp-input');
    const hpMax = this.card.querySelector('.hp-max');
    const hpTemp = this.card.querySelector('.hp-temp');
    const hpBar = this.card.querySelector('.hp-bar-fill, .minimized-hp-fill');
    const hpText = this.card.querySelector('.minimized-hp-text');
    
    if (hpInput) hpInput.value = stats.currentHp;
    if (hpMax) hpMax.textContent = stats.maxHp;
    
    if (hpTemp) {
      if (stats.tempHp > 0) {
        hpTemp.textContent = `+${stats.tempHp}`;
        hpTemp.style.display = 'inline';
      } else {
        hpTemp.style.display = 'none';
      }
    }
    
    const hpPercentage = Math.max(0, (stats.currentHp / stats.maxHp) * 100);
    const hpBarColor = hpPercentage > 60 ? '#4CAF50' : hpPercentage > 30 ? '#FF9800' : '#F44336';
    
    if (hpBar) {
      hpBar.style.width = hpPercentage + '%';
      hpBar.style.backgroundColor = hpBarColor;
    }
    
    if (hpText) {
      hpText.textContent = `${stats.currentHp}/${stats.maxHp}`;
    }
  }

  savePosition() {
    const position = {
      x: this.card.offsetLeft,
      y: this.card.offsetTop
    };
    
    const size = {
      width: this.card.offsetWidth,
      height: this.card.offsetHeight
    };
    
    this.manager.updatePetData(this.id, { position, size });
  }

  restorePosition() {
    if (this.petData.position) {
      this.card.style.left = this.petData.position.x + 'px';
      this.card.style.top = this.petData.position.y + 'px';
    } else {
      // Position new cards in a cascade
      const offset = (this.manager.getActiveCount() - 1) * 30;
      this.card.style.left = (100 + offset) + 'px';
      this.card.style.top = (100 + offset) + 'px';
    }
  }

  destroy() {
    // Remove minimized button if exists
    if (this.minimizedButton) {
      this.minimizedButton.remove();
      this.minimizedButton = null;
    }
    
    // Remove card
    if (this.card && this.card.parentNode) {
      this.card.parentNode.removeChild(this.card);
    }
    this.card = null;
  }
}

export default ActivePetCard;
