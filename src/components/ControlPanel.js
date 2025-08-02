class ControlPanel {
  constructor(features, onToggleFeature, onClose) {
    this.features = features;
    this.onToggleFeature = onToggleFeature;
    this.onClose = onClose;
    this.element = null;
  }

  render() {
    if (this.element) {
      return this.element;
    }

    this.element = document.createElement('div');
    this.element.className = 'toolbelt-control-panel';
    
    this.element.innerHTML = `
      <div class="control-panel-overlay"></div>
      <div class="control-panel-content">
        <div class="control-panel-header">
          <h3>D&D Beyond Toolbelt</h3>
          <button class="control-panel-close">×</button>
        </div>
        <div class="control-panel-body">
          <p class="control-panel-description">
            Toggle features to enhance your D&D Beyond experience
          </p>
          <div class="features-list">
            ${this.renderFeatures()}
          </div>
        </div>
        <div class="control-panel-footer">
          <small>Version 1.0.0 - D&D Beyond Toolbelt</small>
        </div>
      </div>
    `;

    this.attachEventListeners();
    return this.element;
  }

  renderFeatures() {
    return Object.entries(this.features).map(([featureName, feature]) => `
      <div class="feature-item">
        <label class="feature-toggle">
          <input
            type="checkbox"
            data-feature="${featureName}"
            ${feature.enabled ? 'checked' : ''}
          />
          <span class="toggle-slider"></span>
          <span class="feature-info">
            <span class="feature-label">${feature.label}</span>
            <span class="feature-description">${feature.description}</span>
          </span>
        </label>
        <div class="feature-status">
          <span class="status-indicator ${feature.enabled ? 'enabled' : 'disabled'}">
            ${feature.enabled ? 'ON' : 'OFF'}
          </span>
        </div>
      </div>
    `).join('');
  }

  attachEventListeners() {
    // Close button
    const closeButton = this.element.querySelector('.control-panel-close');
    closeButton.addEventListener('click', this.onClose);

    // Overlay click to close
    const overlay = this.element.querySelector('.control-panel-overlay');
    overlay.addEventListener('click', this.onClose);

    // Feature toggles
    const checkboxes = this.element.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const featureName = e.target.dataset.feature;
        this.onToggleFeature(featureName);
      });
    });

    // Escape key to close
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        this.onClose();
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);
  }

  updateFeatures(newFeatures) {
    this.features = newFeatures;
    
    // Update the features list
    const featuresList = this.element.querySelector('.features-list');
    featuresList.innerHTML = this.renderFeatures();
    
    // Reattach event listeners for checkboxes
    const checkboxes = this.element.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const featureName = e.target.dataset.feature;
        this.onToggleFeature(featureName);
      });
    });
  }
}

export default ControlPanel;
