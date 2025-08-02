class TabDetector {
  constructor() {
    this.currentTab = null;
    this.observers = [];
    this.tabChangeListeners = [];
    this.isWatching = false;
  }

  init() {
    if (this.isWatching) return;
    console.log('👁️ Tab detector initialized');
    this.startWatching();
    this.isWatching = true;
  }

  startWatching() {
    // Initial detection
    this.detectCurrentTab();

    // Watch for changes using MutationObserver
    const observer = new MutationObserver(() => {
      this.detectCurrentTab();
    });

    // Observe changes to the menu tabs
    const menuContainer = document.querySelector('menu[class*="styles_tabs_"]');
    if (menuContainer) {
      observer.observe(menuContainer, {
        attributes: true,
        subtree: true,
        attributeFilter: ['aria-checked']
      });
    }

    // Also observe for when the menu appears/changes
    const mainObserver = new MutationObserver(() => {
      const newMenuContainer = document.querySelector('menu[class*="styles_tabs_"]');
      if (newMenuContainer && !this.observers.includes(newMenuContainer)) {
        observer.observe(newMenuContainer, {
          attributes: true,
          subtree: true,
          attributeFilter: ['aria-checked']
        });
      }
    });

    mainObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    this.observers.push(observer, mainObserver);
  }

  detectCurrentTab() {
    const menuContainer = document.querySelector('menu[class*="styles_tabs_"]');
    if (!menuContainer) {
      if (this.currentTab !== null) {
        this.currentTab = null;
        this.notifyTabChange(null, false);
      }
      return;
    }

    const tabs = menuContainer.querySelectorAll('li button');
    let activeTab = null;

    tabs.forEach(button => {
      const isActive = button.getAttribute('aria-checked') === 'true';
      const tabName = button.textContent.trim();
      
      if (isActive) {
        activeTab = tabName;
      }

      // Notify about this specific tab's state
      if (this.currentTab !== tabName || isActive) {
        this.notifyTabChange(tabName, isActive);
      }
    });

    if (this.currentTab !== activeTab) {
      console.log(`🔄 Tab changed: ${this.currentTab} → ${activeTab}`);
      this.currentTab = activeTab;
    }
  }

  addTabChangeListener(callback) {
    this.tabChangeListeners.push(callback);
  }

  removeTabChangeListener(callback) {
    const index = this.tabChangeListeners.indexOf(callback);
    if (index > -1) {
      this.tabChangeListeners.splice(index, 1);
    }
  }

  notifyTabChange(tabName, isActive) {
    this.tabChangeListeners.forEach(callback => {
      try {
        callback(tabName, isActive);
      } catch (error) {
        console.error('Error in tab change listener:', error);
      }
    });
  }

  getCurrentTab() {
    return this.currentTab;
  }

  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.tabChangeListeners = [];
    this.isWatching = false;
    console.log('👁️ Tab detector destroyed');
  }
}

export default TabDetector;
