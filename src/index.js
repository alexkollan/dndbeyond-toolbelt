import ToolbeltApp from './components/ToolbeltApp';
import './styles.css';

// Main initialization function
function initializeToolbelt() {
  // Find the character header container
  const headerContainer = document.querySelector('.ct-character-header-desktop');
  
  if (!headerContainer) {
    console.log('D&D Beyond character header not found, retrying...!');
    setTimeout(initializeToolbelt, 1000);
    return;
  }

  console.log('D&D Beyond Toolbelt initializing.');

  // Find the share button group to insert before
  const shareGroup = headerContainer.querySelector('.ct-character-header-desktop__group--share');
  
  if (!shareGroup) {
    console.log('Share button group not found, retrying...');
    setTimeout(initializeToolbelt, 1000);
    return;
  }

  // Check if toolbelt is already initialized
  if (document.getElementById('dndbeyond-toolbelt-root')) {
    console.log('D&D Beyond Toolbelt already initialized...!');
    return;
  }

  // Create the toolbelt container as a header group (same level as share button)
  const toolbeltContainer = document.createElement('div');
  toolbeltContainer.id = 'dndbeyond-toolbelt-root';
  toolbeltContainer.className = 'ct-character-header-desktop__group ct-character-header-desktop__group--toolbelt';
  
  // Insert the toolbelt before the share button group
  shareGroup.parentNode.insertBefore(toolbeltContainer, shareGroup);

  // Initialize the Toolbelt app
  const app = new ToolbeltApp(toolbeltContainer);
  app.mount();
  
  console.log('D&D Beyond Toolbelt initialized successfully!');
}

// Only initialize on D&D Beyond character pages (not in development)
if (window.location.hostname.includes('dndbeyond.com') || window.location.hostname.includes('localhost')) {
  // For production (Tampermonkey), initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeToolbelt);
  } else {
    initializeToolbelt();
  }
}

// Export for Tampermonkey usage
window.DNDBeyondToolbelt = {
  init: initializeToolbelt
};
