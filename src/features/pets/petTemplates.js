// This file contains HTML templates for rendering pet stat blocks
class PetTemplates {
  static formatModifier(score) {
    const modifier = Math.floor((score - 10) / 2);
    return modifier >= 0 ? `+${modifier}` : `${modifier}`;
  }

  static calculateScaledHP(baseHP, hpPerLevel, currentLevel, minimumLevel) {
    if (!hpPerLevel) return baseHP;
    const additionalLevels = Math.max(0, currentLevel - minimumLevel);
    return baseHP + (hpPerLevel * additionalLevels);
  }

  static formatAttackBonus(baseBonus, currentLevel, minimumLevel) {
    if (typeof baseBonus === 'string' && baseBonus.includes('spell')) {
      return baseBonus; // Return as-is for spell-based bonuses
    }
    
    // For numeric bonuses, add scaling if applicable
    const numericBonus = parseInt(baseBonus.replace('+', ''));
    if (currentLevel > minimumLevel) {
      const levelDiff = currentLevel - minimumLevel;
      const scaledBonus = numericBonus + Math.floor(levelDiff / 2);
      return `+${scaledBonus}`;
    }
    return baseBonus;
  }

  static formatDamage(baseDamage, currentLevel, minimumLevel, scalingDamage) {
    if (!scalingDamage || currentLevel <= minimumLevel) {
      return baseDamage;
    }
    
    const levelDiff = currentLevel - minimumLevel;
    const additionalDice = Math.floor(levelDiff / 2);
    
    if (additionalDice > 0) {
      return `${baseDamage} + ${additionalDice}${scalingDamage.match(/\d*d\d+/)[0]}`;
    }
    
    return baseDamage;
  }

  static renderStatBlock(pet, spellLevel = null, minimumLevel = 1) {
    const effectiveLevel = spellLevel || minimumLevel;
    const stats = pet.baseStats || pet.stats;
    
    // Calculate scaled values
    const scaledHP = this.calculateScaledHP(
      pet.baseStats?.hp || pet.hp,
      pet.baseStats?.hpPerLevel,
      effectiveLevel,
      minimumLevel
    );

    return `
      <div class="pet-stat-block">
        <div class="pet-header">
          <h3 class="pet-name">${pet.name}</h3>
          <div class="pet-type">${pet.size} ${pet.type}</div>
        </div>
        
        <div class="pet-basic-stats">
          <div class="stat-line">
            <strong>Armor Class:</strong> ${pet.ac || stats?.ac || 'N/A'}
          </div>
          <div class="stat-line">
            <strong>Hit Points:</strong> ${scaledHP}${spellLevel ? ` (scaled to level ${spellLevel})` : ''}
          </div>
          <div class="stat-line">
            <strong>Speed:</strong> ${pet.speed || stats?.speed || 'N/A'}
          </div>
        </div>

        ${this.renderAbilityScores(stats)}
        ${this.renderSkillsAndSenses(pet)}
        ${this.renderResistancesAndImmunities(pet)}
        ${this.renderAbilities(pet.abilities)}
        ${this.renderActions(pet.actions, effectiveLevel, minimumLevel)}
      </div>
    `;
  }

  static renderAbilityScores(stats) {
    if (!stats) return '';
    
    return `
      <div class="ability-scores">
        <div class="ability-score">
          <div class="ability-name">STR</div>
          <div class="ability-value">${stats.str || 10} (${this.formatModifier(stats.str || 10)})</div>
        </div>
        <div class="ability-score">
          <div class="ability-name">DEX</div>
          <div class="ability-value">${stats.dex || 10} (${this.formatModifier(stats.dex || 10)})</div>
        </div>
        <div class="ability-score">
          <div class="ability-name">CON</div>
          <div class="ability-value">${stats.con || 10} (${this.formatModifier(stats.con || 10)})</div>
        </div>
        <div class="ability-score">
          <div class="ability-name">INT</div>
          <div class="ability-value">${stats.int || 10} (${this.formatModifier(stats.int || 10)})</div>
        </div>
        <div class="ability-score">
          <div class="ability-name">WIS</div>
          <div class="ability-value">${stats.wis || 10} (${this.formatModifier(stats.wis || 10)})</div>
        </div>
        <div class="ability-score">
          <div class="ability-name">CHA</div>
          <div class="ability-value">${stats.cha || 10} (${this.formatModifier(stats.cha || 10)})</div>
        </div>
      </div>
    `;
  }

  static renderSkillsAndSenses(pet) {
    let content = '';
    
    if (pet.skills) {
      const skillsList = Object.entries(pet.skills)
        .map(([skill, bonus]) => `${skill.charAt(0).toUpperCase() + skill.slice(1)} +${bonus}`)
        .join(', ');
      content += `
        <div class="stat-line">
          <strong>Skills:</strong> ${skillsList}
        </div>
      `;
    }

    if (pet.senses) {
      content += `
        <div class="stat-line">
          <strong>Senses:</strong> ${pet.senses}
        </div>
      `;
    }

    if (pet.languages) {
      content += `
        <div class="stat-line">
          <strong>Languages:</strong> ${pet.languages}
        </div>
      `;
    }

    return content;
  }

  static renderResistancesAndImmunities(pet) {
    let content = '';
    
    if (pet.damageResistance) {
      content += `
        <div class="stat-line">
          <strong>Damage Resistances:</strong> ${pet.damageResistance}
        </div>
      `;
    }

    if (pet.damageImmunity) {
      content += `
        <div class="stat-line">
          <strong>Damage Immunities:</strong> ${pet.damageImmunity}
        </div>
      `;
    }

    if (pet.conditionImmunity) {
      content += `
        <div class="stat-line">
          <strong>Condition Immunities:</strong> ${pet.conditionImmunity}
        </div>
      `;
    }

    return content;
  }

  static renderAbilities(abilities) {
    if (!abilities || abilities.length === 0) return '';
    
    return `
      <div class="pet-abilities">
        <h4>Special Abilities</h4>
        ${abilities.map(ability => `
          <div class="ability">
            <strong>${ability.name}.</strong> ${ability.description}
          </div>
        `).join('')}
      </div>
    `;
  }

  static renderActions(actions, effectiveLevel = 1, minimumLevel = 1) {
    if (!actions || actions.length === 0) return '';
    
    return `
      <div class="pet-actions">
        <h4>Actions</h4>
        ${actions.map(action => this.renderAction(action, effectiveLevel, minimumLevel)).join('')}
      </div>
    `;
  }

  static renderAction(action, effectiveLevel, minimumLevel) {
    let actionText = '';
    
    if (action.type === 'Melee Weapon Attack' || action.type === 'Ranged Weapon Attack') {
      const scaledBonus = this.formatAttackBonus(action.bonus, effectiveLevel, minimumLevel);
      const scaledDamage = this.formatDamage(action.damage, effectiveLevel, minimumLevel, action.scalingDamage);
      
      actionText = `<em>${action.type}:</em> ${scaledBonus} to hit, reach ${action.reach || '5 ft.'}, one target. 
                   <em>Hit:</em> ${scaledDamage}.`;
    } else if (action.type === 'Melee Spell Attack') {
      const scaledDamage = this.formatDamage(action.damage, effectiveLevel, minimumLevel, action.scalingDamage);
      actionText = `<em>${action.type}:</em> ${action.bonus} to hit, reach ${action.reach || '5 ft.'}, one target. 
                   <em>Hit:</em> ${scaledDamage}.`;
    } else if (action.type === 'Area Effect') {
      const scaledDamage = this.formatDamage(action.damage, effectiveLevel, minimumLevel, action.scalingDamage);
      actionText = `${action.area}, ${action.save} save. <em>Effect:</em> ${scaledDamage}.`;
    } else {
      actionText = action.description || '';
    }

    if (action.additionalEffect) {
      actionText += ` ${action.additionalEffect}`;
    }

    return `
      <div class="action">
        <strong>${action.name}.</strong> ${actionText}
      </div>
    `;
  }

  static renderSpellLevelSelector(spellData) {
    if (!spellData.scalingLevels || spellData.scalingLevels.length <= 1) {
      return '';
    }

    return `
      <div class="spell-level-selector">
        <label for="spell-level-select">Cast at Level:</label>
        <select id="spell-level-select" class="spell-level-select">
          ${spellData.scalingLevels.map(level => `
            <option value="${level}" ${level === spellData.summonLevel ? 'selected' : ''}>
              ${level}${level === 1 ? 'st' : level === 2 ? 'nd' : level === 3 ? 'rd' : 'th'} Level
            </option>
          `).join('')}
        </select>
      </div>
    `;
  }

  static renderPetOptions(spellData, selectedLevel = null) {
    const effectiveLevel = selectedLevel || spellData.summonLevel;
    
    return `
      <div class="pet-options">
        ${spellData.options.map((pet, index) => `
          <div class="pet-option" data-pet-index="${index}">
            <div class="pet-option-header">
              <h4>${pet.name}</h4>
              ${pet.maxCount ? `<span class="max-count">Max: ${pet.maxCount}</span>` : ''}
            </div>
            <div class="pet-option-content">
              ${this.renderStatBlock(pet, effectiveLevel, spellData.summonLevel)}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  static renderPetSummaryCard(spellData) {
    return `
      <div class="pet-summary-card">
        <h3>${spellData.name}</h3>
        <p class="pet-description">${spellData.description}</p>
        <div class="pet-summary-stats">
          <span class="spell-level">Spell Level: ${spellData.summonLevel}</span>
          <span class="option-count">${spellData.options.length} option${spellData.options.length !== 1 ? 's' : ''}</span>
        </div>
      </div>
    `;
  }
}

export default PetTemplates;
