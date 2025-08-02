import ToolbeltButton from './ToolbeltButton';
import ControlPanel from './ControlPanel';
import FeatureManager from '../features/FeatureManager';
import TabDetector from '../utils/TabDetector';

class ToolbeltApp {
  constructor(container) {
    this.container = container;
    this.isControlPanelOpen = false;
    this.tabDetector = new TabDetector();
    this.featureManager = new FeatureManager(this.tabDetector);
    
    // Track global toggle state separately (this is UI-only logic)
    this.globalToggleEnabled = true;
    
    this.button = null;
    this.controlPanel = null;
    
    // Bind methods
    this.toggleControlPanel = this.toggleControlPanel.bind(this);
    this.toggleFeature = this.toggleFeature.bind(this);
    this.closeControlPanel = this.closeControlPanel.bind(this);
  }

  mount() {
    // Don't add the container class here since it's already set in index.js
    // The container is now a proper header group
    
    // Create and mount the button directly (no wrapper div needed)
    this.button = new ToolbeltButton(this.toggleControlPanel);
    const buttonElement = this.button.render();
    
    // The button element already has the correct structure, so append it directly
    this.container.appendChild(buttonElement);
    
    // Initialize tab detector
    this.tabDetector.init();

    // Features are now initialized automatically based on localStorage preferences
    // No need to manually enable features here
  }  toggleControlPanel() {
    this.isControlPanelOpen = !this.isControlPanelOpen;
    
    if (this.isControlPanelOpen) {
      this.showControlPanel();
    } else {
      this.hideControlPanel();
    }
  }

  showControlPanel() {
    if (!this.controlPanel) {
      this.controlPanel = new ControlPanel(
        this.getFeaturesForUI(),
        this.toggleFeature,
        this.closeControlPanel
      );
    }
    
    document.body.appendChild(this.controlPanel.render());
  }

  hideControlPanel() {
    if (this.controlPanel && this.controlPanel.element) {
      document.body.removeChild(this.controlPanel.element);
    }
  }

  closeControlPanel() {
    this.isControlPanelOpen = false;
    this.hideControlPanel();
  }

  getFeaturesForUI() {
    // Get feature metadata directly from FeatureManager
    const featuresInfo = this.featureManager.getAllFeaturesInfo();
    const featuresForUI = {};
    
    // Add regular features using their own metadata
    featuresInfo.forEach(feature => {
      featuresForUI[feature.key] = {
        label: feature.name,
        description: feature.description,
        enabled: feature.enabled
      };
    });
    
    // Add global toggle
    featuresForUI.globalToggle = {
      label: 'Enable All Features',
      description: 'Master toggle for all toolbelt features',
      enabled: this.globalToggleEnabled
    };
    
    return featuresForUI;
  }

  toggleFeature(featureName) {
    // Handle global toggle
    if (featureName === 'globalToggle') {
      this.globalToggleEnabled = !this.globalToggleEnabled;
      
      // Enable/disable all features through FeatureManager
      const allFeatures = this.featureManager.getAllFeatures();
      allFeatures.forEach(featureName => {
        if (this.globalToggleEnabled) {
          this.featureManager.enableFeature(featureName);
        } else {
          this.featureManager.disableFeature(featureName);
        }
      });
    } else {
      // Toggle individual feature
      if (this.featureManager.isFeatureEnabled(featureName)) {
        this.featureManager.disableFeature(featureName);
      } else {
        this.featureManager.enableFeature(featureName);
      }
      
      // Update global toggle state based on individual features
      const allFeatures = this.featureManager.getAllFeatures();
      const allEnabled = allFeatures.every(featureName => this.featureManager.isFeatureEnabled(featureName));
      
      this.globalToggleEnabled = allEnabled;
    }
    
    // Update control panel if it's open
    if (this.controlPanel) {
      this.controlPanel.updateFeatures(this.getFeaturesForUI());
    }
  }
}

export default ToolbeltApp;
