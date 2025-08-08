import ActivePetsStorage from './activePetsStorage.js';
import ActivePetCard from './ActivePetCard.js';
import petsData from './petsData.js';

class ActivePetsManager {
  constructor() {
    this.activePets = new Map(); // petId -> ActivePetCard instance
    this.nextInstanceNumbers = new Map(); // spellKey-petIndex -> next number
    this.minimizedCards = new Set();
    this.floatingButton = null;
    
    this.init();
  }

  init() {
    this.findFloatingButton();
    this.loadSavedPets();
  }

  findFloatingButton() {
    // Find the existing pets floating button to position minimized cards near it
    this.floatingButton = document.querySelector('.pets-floating-btn');
  }

  loadSavedPets() {
    const savedData = ActivePetsStorage.getActivePets();
    
    savedData.pets.forEach(petData => {
      if (ActivePetsStorage.validatePetData(petData)) {
        this.createPetCard(petData);
        
        // Track instance numbers
        const key = `${petData.spellKey}-${petData.petIndex}`;
        const instanceNum = this.extractInstanceNumber(petData.instanceName);
        if (instanceNum > 0) {
          this.nextInstanceNumbers.set(key, Math.max(
            this.nextInstanceNumbers.get(key) || 1,
            instanceNum + 1
          ));
        }
      }
    });
  }

  activatePet(spellKey, petIndex, spellLevel = null) {
    const spellData = petsData[spellKey];
    const pet = spellData?.options[petIndex];
    
    if (!pet || !spellData) {
      console.error('Pet not found:', spellKey, petIndex);
      return null;
    }

    // Generate instance name
    const key = `${spellKey}-${petIndex}`;
    const instanceNumber = this.nextInstanceNumbers.get(key) || 1;
    this.nextInstanceNumbers.set(key, instanceNumber + 1);
    
    const instanceName = `${pet.name} #${instanceNumber}`;

    // Calculate initial stats
    const effectiveLevel = spellLevel || spellData.summonLevel;
    const petData = pet.baseStats || pet;
    const stats = petData.stats || pet.stats || {};
    
    // Calculate HP with scaling
    let maxHp = petData.hp || pet.hp || 10;
    if (petData.hpPerLevel && effectiveLevel > spellData.summonLevel) {
      const additionalLevels = effectiveLevel - spellData.summonLevel;
      maxHp += petData.hpPerLevel * additionalLevels;
    }

    const petInstanceData = {
      spellKey,
      petIndex,
      spellLevel: effectiveLevel,
      instanceName,
      position: null, // Will be set by card
      size: null, // Will be set by card
      isMinimized: false,
      zIndex: ActivePetsStorage.getNextZIndex(),
      stats: {
        currentHp: maxHp,
        maxHp: maxHp,
        tempHp: 0,
        maxHpOverride: null
      }
    };

    // Save to storage and get the full data with ID
    const savedPetData = ActivePetsStorage.addActivePet(petInstanceData);
    
    // Create the pet card
    const petCard = this.createPetCard(savedPetData);
    
    console.log(`🐾 Activated pet: ${instanceName}`);
    return petCard;
  }

  createPetCard(petData) {
    const petCard = new ActivePetCard(petData, this);
    this.activePets.set(petData.id, petCard);
    
    if (petData.isMinimized) {
      this.minimizedCards.add(petData.id);
      this.repositionMinimizedCards();
    }
    
    return petCard;
  }

  deactivatePet(petId) {
    const petCard = this.activePets.get(petId);
    if (petCard) {
      petCard.destroy();
      this.activePets.delete(petId);
      this.minimizedCards.delete(petId);
      ActivePetsStorage.removeActivePet(petId);
      this.repositionMinimizedCards();
      
      console.log(`🐾 Deactivated pet: ${petId}`);
      return true;
    }
    return false;
  }

  updatePetData(petId, updates) {
    const petCard = this.activePets.get(petId);
    if (petCard) {
      // Update the card's data
      Object.assign(petCard.petData, updates);
      
      // Update storage
      ActivePetsStorage.updateActivePet(petId, updates);
      return true;
    }
    return false;
  }

  getActivePet(petId) {
    return this.activePets.get(petId);
  }

  getAllActivePets() {
    return Array.from(this.activePets.values());
  }

  getActiveCount() {
    return this.activePets.size;
  }

  getNextZIndex() {
    return ActivePetsStorage.getNextZIndex();
  }

  positionMinimizedCard(petCard) {
    this.minimizedCards.add(petCard.id);
    this.repositionMinimizedCards();
  }

  repositionMinimizedCards() {
    const minimizedArray = Array.from(this.minimizedCards);
    const buttonRect = this.floatingButton?.getBoundingClientRect();
    
    // Default position if button not found
    let baseX = window.innerWidth - 100;
    let baseY = window.innerHeight - 140;
    
    if (buttonRect) {
      baseX = buttonRect.left - 90;
      baseY = buttonRect.top;
    }

    minimizedArray.forEach((petId, index) => {
      const petCard = this.activePets.get(petId);
      if (petCard && petCard.isMinimized) {
        const row = Math.floor(index / 4);
        const col = index % 4;
        
        const x = baseX - (col * 90);
        const y = baseY - (row * 70);
        
        // Ensure cards stay on screen
        const finalX = Math.max(10, Math.min(x, window.innerWidth - 90));
        const finalY = Math.max(10, Math.min(y, window.innerHeight - 70));
        
        petCard.card.style.left = finalX + 'px';
        petCard.card.style.top = finalY + 'px';
      }
    });
  }

  isPetActive(spellKey, petIndex) {
    return Array.from(this.activePets.values()).some(
      petCard => petCard.petData.spellKey === spellKey && 
                petCard.petData.petIndex === petIndex
    );
  }

  getActivePetsByType(spellKey, petIndex) {
    return Array.from(this.activePets.values()).filter(
      petCard => petCard.petData.spellKey === spellKey && 
                petCard.petData.petIndex === petIndex
    );
  }

  minimizeAll() {
    this.activePets.forEach(petCard => {
      if (!petCard.isMinimized) {
        petCard.minimize();
      }
    });
  }

  restoreAll() {
    this.activePets.forEach(petCard => {
      if (petCard.isMinimized) {
        petCard.restore();
      }
    });
  }

  closeAll() {
    const petIds = Array.from(this.activePets.keys());
    petIds.forEach(petId => this.deactivatePet(petId));
  }

  extractInstanceNumber(instanceName) {
    const match = instanceName.match(/#(\d+)$/);
    return match ? parseInt(match[1]) : 0;
  }

  // Handle window resize to keep cards in bounds
  handleWindowResize() {
    this.activePets.forEach(petCard => {
      if (!petCard.isMinimized && petCard.card) {
        const rect = petCard.card.getBoundingClientRect();
        let needsUpdate = false;
        let newLeft = rect.left;
        let newTop = rect.top;

        // Keep cards within viewport
        if (rect.right > window.innerWidth) {
          newLeft = window.innerWidth - rect.width;
          needsUpdate = true;
        }
        if (rect.bottom > window.innerHeight) {
          newTop = window.innerHeight - rect.height;
          needsUpdate = true;
        }
        if (rect.left < 0) {
          newLeft = 0;
          needsUpdate = true;
        }
        if (rect.top < 0) {
          newTop = 0;
          needsUpdate = true;
        }

        if (needsUpdate) {
          petCard.card.style.left = newLeft + 'px';
          petCard.card.style.top = newTop + 'px';
          petCard.savePosition();
        }
      }
    });

    // Reposition minimized cards
    this.repositionMinimizedCards();
  }

  getMinimizedIndex(petId) {
    const minimizedPets = Array.from(this.activePets.values()).filter(pet => pet.petData.isMinimized);
    return minimizedPets.findIndex(pet => pet.petData.id === petId);
  }

  updateMinimizedPositions() {
    const minimizedPets = Array.from(this.activePets.values()).filter(pet => pet.petData.isMinimized);
    minimizedPets.forEach((pet, index) => {
      if (pet.minimizedButton) {
        const row = Math.floor(index / 4);
        const col = index % 4;
        const bottom = 90 + (row * 70);
        const right = 20 + (col * 70);
        
        pet.minimizedButton.style.bottom = `${bottom}px`;
        pet.minimizedButton.style.right = `${right}px`;
      }
    });
  }

  // Clean up method
  destroy() {
    this.activePets.forEach(petCard => petCard.destroy());
    this.activePets.clear();
    this.minimizedCards.clear();
    this.nextInstanceNumbers.clear();
    
    // Remove window resize listener if added
    window.removeEventListener('resize', this.handleWindowResize.bind(this));
  }
}

export default ActivePetsManager;
