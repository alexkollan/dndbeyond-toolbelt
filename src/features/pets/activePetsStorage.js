// Active pets localStorage management
class ActivePetsStorage {
  static STORAGE_KEY = 'dndbeyond-toolbelt-active-pets';

  static getActivePets() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (!data) return { pets: [], lastZIndex: 1000 };
      
      const parsed = JSON.parse(data);
      return {
        pets: Array.isArray(parsed.pets) ? parsed.pets : [],
        lastZIndex: parsed.lastZIndex || 1000
      };
    } catch (error) {
      console.warn('Failed to load active pets from localStorage:', error);
      return { pets: [], lastZIndex: 1000 };
    }
  }

  static saveActivePets(data) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save active pets to localStorage:', error);
    }
  }

  static addActivePet(petData) {
    const data = this.getActivePets();
    data.pets.push({
      ...petData,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    });
    this.saveActivePets(data);
    return data.pets[data.pets.length - 1];
  }

  static updateActivePet(petId, updates) {
    const data = this.getActivePets();
    const petIndex = data.pets.findIndex(pet => pet.id === petId);
    
    if (petIndex !== -1) {
      data.pets[petIndex] = {
        ...data.pets[petIndex],
        ...updates,
        lastModified: new Date().toISOString()
      };
      this.saveActivePets(data);
      return data.pets[petIndex];
    }
    return null;
  }

  static removeActivePet(petId) {
    const data = this.getActivePets();
    data.pets = data.pets.filter(pet => pet.id !== petId);
    this.saveActivePets(data);
    return data;
  }

  static getNextZIndex() {
    const data = this.getActivePets();
    data.lastZIndex += 1;
    this.saveActivePets(data);
    return data.lastZIndex;
  }

  static generateId() {
    return 'pet_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  static clearAllActivePets() {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  static validatePetData(petData) {
    const required = ['spellKey', 'petIndex', 'instanceName'];
    return required.every(field => petData.hasOwnProperty(field));
  }
}

export default ActivePetsStorage;
