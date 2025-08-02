class SpellEnhancementsFeature {
  constructor() {
    this.name = 'Spell Enhancements';
    this.description = 'Hide upcasted spells and show only base level versions';
    this.initialized = false;
    this.hideUpcastedSpells = false;
    this.hiddenSpells = new Set();
  }

  init() {
    if (this.initialized) return;
    console.log('🔮 Spell Enhancements feature initialized');
    
    // Don't add the toggle button immediately - wait for spells tab to be active
    // This prevents the button from appearing when the feature is disabled
    
    this.initialized = true;
  }

  addToggleButton() {
    // Find the spells filter section to add our toggle
    const filterSection = document.querySelector('.ct-spells-filter');
    if (!filterSection) return;

    // Create the toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'ct-theme-button ct-theme-button--outline ct-theme-button--interactive ct-button character-button ddbc-button character-button-medium spell-enhancement-toggle';
    toggleButton.innerHTML = `
      <span class="ct-button__content">
        <span class="spell-enhancement-icon">🔮</span>
        Hide Upcasted Spells
      </span>
    `;
    
    // Add some custom styling
    toggleButton.style.marginLeft = '10px';
    toggleButton.style.opacity = this.hideUpcastedSpells ? '1' : '0.7';
    
    // Add click handler
    toggleButton.addEventListener('click', () => {
      this.toggleUpcastedSpells();
    });

    // Insert the button after the "Manage Spells" button
    const manageSpellsButton = filterSection.querySelector('.ct-spells-filter__callout button');
    if (manageSpellsButton && manageSpellsButton.parentNode) {
      manageSpellsButton.parentNode.appendChild(toggleButton);
    }
  }

  toggleUpcastedSpells() {
    this.hideUpcastedSpells = !this.hideUpcastedSpells;
    
    // Update button appearance
    const toggleButton = document.querySelector('.spell-enhancement-toggle');
    if (toggleButton) {
      toggleButton.style.opacity = this.hideUpcastedSpells ? '1' : '0.7';
      const content = toggleButton.querySelector('.ct-button__content');
      if (content) {
        content.innerHTML = `
          <span class="spell-enhancement-icon">🔮</span>
          ${this.hideUpcastedSpells ? 'Show All Spells' : 'Hide Upcasted Spells'}
        `;
      }
    }

    if (this.hideUpcastedSpells) {
      this.hideUpcastedSpellsFromDOM();
    } else {
      this.showAllSpells();
    }

    console.log(`🔮 Upcasted spells ${this.hideUpcastedSpells ? 'hidden' : 'shown'}`);
  }

  hideUpcastedSpellsFromDOM() {
    // Clear previously hidden spells
    this.showAllSpells();
    this.hiddenSpells.clear();

    // Find all spell elements
    const spells = document.querySelectorAll('.ct-spells-spell');
    
    spells.forEach(spell => {
      // Check if this spell has the scaled indicator (upcasted)
      const scaledIndicator = spell.querySelector('.ct-spells-spell__scaled');
      
      if (scaledIndicator) {
        // This is an upcasted spell, hide it
        spell.style.display = 'none';
        this.hiddenSpells.add(spell);
        
        // Also check if we need to hide the entire spell level section if it becomes empty
        this.checkAndHideEmptySpellLevel(spell);
      }
    });

    console.log(`🔮 Hidden ${this.hiddenSpells.size} upcasted spells`);
  }

  checkAndHideEmptySpellLevel(hiddenSpell) {
    // Find the parent spell level container
    const spellLevelContent = hiddenSpell.closest('.ct-spells-level__spells-content');
    if (!spellLevelContent) return;

    // Check if all spells in this level are now hidden
    const allSpellsInLevel = spellLevelContent.querySelectorAll('.ct-spells-spell');
    const visibleSpellsInLevel = Array.from(allSpellsInLevel).filter(spell => 
      spell.style.display !== 'none'
    );

    // If no visible spells remain, hide the entire level section
    if (visibleSpellsInLevel.length === 0) {
      const levelSection = spellLevelContent.closest('.ct-content-group');
      if (levelSection) {
        levelSection.style.display = 'none';
        this.hiddenSpells.add(levelSection);
      }
    }
  }

  showAllSpells() {
    // Restore all hidden spells and sections
    this.hiddenSpells.forEach(element => {
      element.style.display = '';
    });
    this.hiddenSpells.clear();
  }

  onTabChange(tabName, isActive) {
    if (tabName === 'Spells' && isActive) {
      console.log('🔮 Spell Enhancements: Spells tab is now active!');
      this.handleSpellsTab();
    }
  }

  handleSpellsTab() {
    // Wait a bit for the spells to load, then add our toggle if not already present
    setTimeout(() => {
      if (!document.querySelector('.spell-enhancement-toggle')) {
        this.addToggleButton();
      }
      
      // If hide mode is active, reapply the filtering
      if (this.hideUpcastedSpells) {
        this.hideUpcastedSpellsFromDOM();
      }
    }, 500);
  }
}

export default SpellEnhancementsFeature;
