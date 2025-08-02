// Add Extra Spells Feature - Adds custom spells to D&D Beyond spells tab
import extraSpells from './extraSpells.js';

class AddExtraSpellsFeature {
  constructor() {
    this.name = 'Add Extra Spells';
    this.description = 'Adds custom spells to the spells tab with dark purple cast buttons';
    this.initialized = false;
    this.extraSpells = extraSpells;
    this.addedSpells = new Set(); // Track added spells to avoid duplicates
  }

  init() {
    if (this.initialized) return;
    
    // Load extra spells configuration
    this.loadExtraSpells();
    
    // Add a global method for testing
    window.dndbToolbelt = window.dndbToolbelt || {};
    window.dndbToolbelt.addExtraSpells = () => {
      this.handleSpellsTab();
    };
    
    this.initialized = true;
  }

  // Called when feature is disabled
  disable() {
    this.removeExtraSpells();
    this.addedSpells.clear();
  }

  loadExtraSpells() {
    try {
      // Extra spells are now imported statically at the top
    } catch (error) {
      console.error('❌ Failed to load extra spells configuration:', error);
      // Initialize with empty data if file doesn't exist
      this.extraSpells = {};
    }
  }

  onTabChange(tabName, isActive) {
    if (tabName === 'Spells' && isActive) {
      this.handleSpellsTab();
    }
  }

  handleSpellsTab() {
    // Wait a bit for the spells to load, then add our extra spells
    setTimeout(() => {
      this.addCustomStyles();
      this.addExtraSpellsToDOM();
    }, 500);
  }

  addExtraSpellsToDOM() {
    if (!this.extraSpells || Object.keys(this.extraSpells).length === 0) {
      return;
    }

    // Clear our tracking set since we're rebuilding
    this.addedSpells.clear();

    // Process each spell level
    Object.entries(this.extraSpells).forEach(([level, spells]) => {
      this.addSpellsToLevel(level, spells);
    });
  }

  addSpellsToLevel(level, spells) {
    // Find the appropriate spell level container
    const levelContainer = this.findSpellLevelContainer(level);
    if (!levelContainer) {
      return;
    }

    const spellsContent = levelContainer.querySelector('.ct-spells-level__spells-content');
    if (!spellsContent) {
      return;
    }

    // Add each spell to this level
    spells.forEach(spell => {
      const spellId = `${level}-${spell.name.replace(/\s+/g, '-').toLowerCase()}`;
      
      // Check if this spell already exists in the DOM (instead of just checking our Set)
      const existingSpell = spellsContent.querySelector(`[data-spell-id="${spellId}"]`);
      if (existingSpell) {
        this.addedSpells.add(spellId); // Ensure it's in our tracking set
        return;
      }

      const spellElement = this.createSpellElement(spell, spellId);
      spellsContent.appendChild(spellElement);
      this.addedSpells.add(spellId);
    });
  }

  findSpellLevelContainer(level) {
    // Map level names to what appears in the DOM
    const levelMap = {
      'cantrip': 'Cantrip',
      '1st': '1st Level',
      '2nd': '2nd Level', 
      '3rd': '3rd Level',
      '4th': '4th Level',
      '5th': '5th Level',
      '6th': '6th Level',
      '7th': '7th Level',
      '8th': '8th Level',
      '9th': '9th Level'
    };

    const targetText = levelMap[level];
    if (!targetText) {
      return null;
    }

    // Find all content group headers
    const headers = document.querySelectorAll('.ct-content-group__header-content');
    
    for (const header of headers) {
      const headerText = header.textContent.trim();
      
      if (headerText === targetText) {
        // Return the parent content group
        const contentGroup = header.closest('.ct-content-group');
        if (contentGroup) {
          return contentGroup;
        }
      }
    }

    return null;
  }

  createSpellElement(spell, spellId) {
    const spellDiv = document.createElement('div');
    spellDiv.className = 'ct-spells-spell';
    spellDiv.setAttribute('data-spell-id', spellId); // Add unique identifier

    spellDiv.innerHTML = `
      <div class="ct-spells-spell__action">
        <button class="ct-theme-button ct-theme-button--filled ct-theme-button--interactive ct-button character-button ddbc-button character-button-block-small dndb-toolbelt-extra-spell" role="button">
          <span class="ct-button__content">Cast</span>
        </button>
      </div>
      <div class="ct-spells-spell__name">
        <div class="ct-spells-spell__label">
          ${spell.url ? 
            `<a href="${spell.url}" target="_blank" rel="noopener noreferrer" class="styles_spellName__wX3ll" style="text-decoration: none; color: inherit;">${spell.name}</a>` :
            `<span class="styles_spellName__wX3ll">${spell.name}</span>`
          }
        </div>
        <div class="ct-spells-spell__meta ct-spells-spell__meta--dark-mode">
          <span class="ct-spells-spell__meta-item">Custom</span>
          <span class="ct-spells-spell__meta-item">${spell.source || 'Homebrew'}</span>
        </div>
      </div>
      <div class="ct-spells-spell__activation ct-spells-spell__activation--dark-mode">
        <span class="ddbc-tooltip ddbc-tooltip--dark-mode" data-tippy="" data-original-title="${spell.casting_time}">${this.formatCastingTime(spell.casting_time)}</span>
      </div>
      <div class="ct-spells-spell__range ct-spells-spell--dark-mode">
        <span class="ct-spells-spell__range-value">${this.formatRange(spell.range)}</span>
      </div>
      <div class="ct-spells-spell__attacking">
        ${this.formatAttack(spell.attack)}
      </div>
      <div class="ct-spells-spell__damage">
        ${this.formatDamage(spell.damage)}
      </div>
      <div class="ct-spells-spell__notes">
        ${this.formatComponents(spell.components)}
      </div>
    `;

    return spellDiv;
  }

  formatCastingTime(castingTime) {
    const timeMap = {
      '1 action': '1A',
      '1 bonus action': '1BA',
      '1 reaction': '1R',
      '1 minute': '1m',
      '10 minutes': '10m',
      '1 hour': '1h',
      '8 hours': '8h',
      '24 hours': '24h'
    };

    return timeMap[castingTime] || castingTime;
  }

  formatRange(range) {
    if (range === 'Self' || range === 'Touch') {
      return `<span class="ct-spells-spell__range-origin">${range}</span>`;
    }
    
    // Extract number and unit for ranges like "30 feet", "120 feet", etc.
    const match = range.match(/(\d+)\s*(feet|ft)/i);
    if (match) {
      return `<span class="styles_numberDisplay__Rg1za"><span>${match[1]}</span><span class="styles_label__L8mZK styles_labelSignColor__Klmbs">ft.</span></span>`;
    }

    return `<span class="ct-spells-spell__range-value">${range}</span>`;
  }

  formatAttack(attack) {
    if (!attack || attack === '--') {
      return '<div class="ct-spells-spell__empty-value">--</div>';
    }

    // Handle spell save DCs
    if (attack.includes('save')) {
      const saveMatch = attack.match(/(\w+)\s+(\d+)/i);
      if (saveMatch) {
        const [, ability, dc] = saveMatch;
        return `
          <div class="ct-spells-spell__save">
            <span class="ct-spells-spell__save-label ct-spells-spell--dark-mode">${ability.toLowerCase()}</span>
            <span class="ct-spells-spell__save-value ct-spells-spell--dark-mode">${dc}</span>
          </div>
        `;
      }
    }

    // Handle spell attack bonuses
    if (attack.includes('+')) {
      const bonus = attack.replace('+', '');
      return `
        <div class="ct-spells-spell__tohit">
          <button aria-haspopup="menu" class="integrated-dice__container">
            <span class="styles_numberDisplay__Rg1za styles_signed__scf97">
              <span class="styles_sign__NdR6X styles_labelSignColor__Klmbs" aria-label="plus">+</span>
              <span>${bonus}</span>
            </span>
          </button>
        </div>
      `;
    }

    return '<div class="ct-spells-spell__empty-value">--</div>';
  }

  formatDamage(damage) {
    if (!damage || damage === '--') {
      return `
        <div class="ddbc-spell-damage-effect ddbc-spell-damage-effect--dark-mode">
          <span class="ddbc-spell-damage-effect__tags ddbc-spell-damage-effect__tags--dark-mode">Varies</span>
        </div>
      `;
    }

    // Handle damage dice (e.g., "2d6 fire")
    const diceMatch = damage.match(/(\d+d\d+(?:\+\d+)?)\s*(\w+)?/i);
    if (diceMatch) {
      const [, dice, damageType] = diceMatch;
      const typeIcon = this.getDamageTypeIcon(damageType);
      
      return `
        <div class="ddbc-spell-damage-effect ddbc-spell-damage-effect--dark-mode">
          <span class="ddbc-spell-damage-effect__damages">
            <button aria-haspopup="menu" class="integrated-dice__container">
              <span class="ddbc-damage__value ddbc-damage__value--dark-mode">${dice}</span>
              ${typeIcon}
            </button>
          </span>
        </div>
      `;
    }

    // Handle effect tags (e.g., "Utility", "Control")
    return `
      <div class="ddbc-spell-damage-effect ddbc-spell-damage-effect--dark-mode">
        <span class="ddbc-spell-damage-effect__tags ddbc-spell-damage-effect__tags--dark-mode">${damage}</span>
      </div>
    `;
  }

  getDamageTypeIcon(damageType) {
    if (!damageType) return '';

    const iconMap = {
      'fire': 'fire',
      'cold': 'cold',
      'lightning': 'lightning',
      'thunder': 'thunder',
      'acid': 'acid',
      'poison': 'poison',
      'necrotic': 'necrotic',
      'radiant': 'radiant',
      'psychic': 'psychic',
      'force': 'force',
      'piercing': 'piercing',
      'slashing': 'slashing',
      'bludgeoning': 'bludgeoning'
    };

    const iconClass = iconMap[damageType.toLowerCase()];
    if (iconClass) {
      return `
        <span class="ddbc-damage__icon">
          <span class="ddbc-damage-type-icon ddbc-damage-type-icon--${iconClass}" aria-label="${damageType} damage">
            <span class="ddbc-tooltip ddbc-tooltip--dark-mode" data-tippy="" data-original-title="${damageType}">
              <!-- SVG icon would go here -->
            </span>
          </span>
        </span>
      `;
    }

    return '';
  }

  formatComponents(components) {
    if (!components) return '<div class="ddbc-note-components"></div>';

    const componentParts = [];

    // Handle duration
    if (components.duration) {
      const durationMap = {
        'Instantaneous': 'Instant',
        '1 minute': 'D: 1m',
        '10 minutes': 'D: 10m',
        '1 hour': 'D: 1h',
        '8 hours': 'D: 8h',
        '24 hours': 'D: 24h',
        'Until dispelled': 'D: Until dispelled',
        'Concentration, up to 1 minute': 'D: 1m',
        'Concentration, up to 10 minutes': 'D: 10m',
        'Concentration, up to 1 hour': 'D: 1h'
      };

      const duration = durationMap[components.duration] || components.duration;
      componentParts.push(`<span class="ddbc-tooltip ddbc-note-components__component ddbc-note-components__component--tooltip ddbc-note-components__component--dark-mode ddbc-tooltip--dark-mode" data-tippy="" data-original-title="${components.duration}">${duration}</span>`);
    }

    // Handle V/S/M components
    const componentLetters = [];
    if (components.verbal) componentLetters.push('V');
    if (components.somatic) componentLetters.push('S');
    if (components.material) componentLetters.push('M');

    if (componentLetters.length > 0) {
      const componentString = componentLetters.map(letter => 
        `<span class="ddbc-tooltip ddbc-note-components__component ddbc-note-components__component--tooltip ddbc-note-components__component--dark-mode ddbc-tooltip--dark-mode" data-tippy="" data-original-title="${this.getComponentTooltip(letter)}">${letter}</span>`
      ).join('/');
      
      componentParts.push(componentString);
    }

    return `<div class="ddbc-note-components">${componentParts.join(', ')}</div>`;
  }

  getComponentTooltip(component) {
    const tooltips = {
      'V': 'Verbal',
      'S': 'Somatic', 
      'M': 'Material'
    };
    return tooltips[component] || component;
  }

  // Add custom CSS for dark purple cast buttons
  addCustomStyles() {
    if (document.getElementById('dndb-toolbelt-extra-spells-styles')) {
      return; // Styles already added
    }

    const style = document.createElement('style');
    style.id = 'dndb-toolbelt-extra-spells-styles';
    style.textContent = `
      .dndb-toolbelt-extra-spell {
        background-color: #4a148c !important;
        border-color: #4a148c !important;
      }
      
      .dndb-toolbelt-extra-spell:hover {
        background-color: #6a1b9a !important;
        border-color: #6a1b9a !important;
      }
      
      .dndb-toolbelt-extra-spell:active {
        background-color: #38006b !important;
        border-color: #38006b !important;
      }

      .dndb-toolbelt-extra-spell .ct-button__content {
        color: white !important;
      }

      /* Styling for clickable spell names */
      [data-spell-id] .styles_spellName__wX3ll a {
        transition: color 0.2s ease;
      }

      [data-spell-id] .styles_spellName__wX3ll a:hover {
        color: #4a148c !important;
        text-decoration: underline !important;
      }
    `;

    document.head.appendChild(style);
  }

  // Remove all extra spells from the DOM
  removeExtraSpells() {
    const extraSpells = document.querySelectorAll('[data-spell-id]');
    extraSpells.forEach(spell => {
      spell.remove();
    });
  }
}

export default AddExtraSpellsFeature;
