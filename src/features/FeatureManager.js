// Feature Manager - Handles enabling/disabling individual features
import SpellEnhancementsFeature from './spellEnhancements';
import AddExtraSpellsFeature from './addExtraSpells';

class FeatureManager {
  constructor(tabDetector) {
    this.tabDetector = tabDetector;
    this.features = {
      spellEnhancements: new SpellEnhancementsFeature(),
      addExtraSpells: new AddExtraSpellsFeature()
    };
    
    this.enabledFeatures = new Set();
    this.storageKey = 'dndbeyond-toolbelt-enabled-features';
    
    // Load enabled features from local storage
    this.loadEnabledFeatures();
    
    // Set up tab change listener for features that need it
    if (this.tabDetector) {
      this.tabDetector.addTabChangeListener((tabName, isActive) => {
        // Notify only enabled features about tab changes
        this.enabledFeatures.forEach(featureName => {
          const feature = this.features[featureName];
          if (feature && feature.onTabChange) {
            feature.onTabChange(tabName, isActive);
          }
        });
      });
    }
  }

  enableFeature(featureName) {
    const feature = this.features[featureName];
    
    if (feature && !this.enabledFeatures.has(featureName)) {
      try {
        // Initialize the feature if it hasn't been initialized yet
        if (!feature.initialized) {
          feature.init();
        }
        this.enabledFeatures.add(featureName);
        this.saveEnabledFeatures();
      } catch (error) {
        console.error(`❌ Failed to enable feature ${featureName}:`, error);
      }
    }
  }

  disableFeature(featureName) {
    const feature = this.features[featureName];
    if (feature && this.enabledFeatures.has(featureName)) {
      try {
        // Call disable method if it exists
        if (typeof feature.disable === 'function') {
          feature.disable();
        }
        
        this.enabledFeatures.delete(featureName);
        this.saveEnabledFeatures();
      } catch (error) {
        console.error(`❌ Failed to disable feature ${featureName}:`, error);
      }
    }
  }

  isFeatureEnabled(featureName) {
    return this.enabledFeatures.has(featureName);
  }

  getAllEnabledFeatures() {
    return Array.from(this.enabledFeatures);
  }

  getAllFeatures() {
    return Object.keys(this.features);
  }

  getFeatureInfo(featureName) {
    const feature = this.features[featureName];
    if (!feature) return null;
    
    return {
      name: feature.name,
      description: feature.description,
      enabled: this.isFeatureEnabled(featureName),
      initialized: feature.initialized
    };
  }

  getAllFeaturesInfo() {
    return Object.keys(this.features).map(featureName => ({
      key: featureName,
      ...this.getFeatureInfo(featureName)
    }));
  }

  disableAllFeatures() {
    this.enabledFeatures.forEach(featureName => {
      this.disableFeature(featureName);
    });
  }

  // Local storage methods for persistence
  saveEnabledFeatures() {
    // Don't save during loading process to avoid recursion
    if (this.isLoading) {
      return;
    }
    
    try {
      const enabledArray = Array.from(this.enabledFeatures);
      localStorage.setItem(this.storageKey, JSON.stringify(enabledArray));
    } catch (error) {
      console.error('❌ Failed to save enabled features to local storage:', error);
    }
  }

  loadEnabledFeatures() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      
      if (stored) {
        const enabledArray = JSON.parse(stored);
        
        // Clear the set first to ensure we start fresh
        this.enabledFeatures.clear();
        
        // Only process if there are actually enabled features
        if (enabledArray.length > 0) {
          // Temporarily disable saving during the load process
          this.isLoading = true;
          
          enabledArray.forEach(featureName => {
            if (this.features[featureName]) {
              // Use enableFeature method to ensure proper initialization
              this.enableFeature(featureName);
            }
          });
          
          // Re-enable saving
          this.isLoading = false;
        }
      } else {
        // Initialize with empty state - no features enabled by default
        this.enabledFeatures.clear();
        
        // Create the localStorage entry with all features disabled
        this.saveEnabledFeatures();
      }
    } catch (error) {
      console.error('❌ Failed to load enabled features from local storage:', error);
      // Clear corrupted data and start fresh
      localStorage.removeItem(this.storageKey);
      this.enabledFeatures.clear();
    }
  }

  clearStoredPreferences() {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.error('❌ Failed to clear stored preferences:', error);
    }
  }
}

export default FeatureManager;
