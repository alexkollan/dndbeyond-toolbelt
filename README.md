# D&D Beyond Toolbelt

A powerful userscript that enhances your D&D Beyond character sheets with additional features and quality-of-life improvements.

## Installation

### Prerequisites
1. Install [Tampermonkey](https://www.tampermonkey.net/) browser extension for your browser
2. Navigate to any D&D Beyond character page to test after installation

### Installation Steps
1. Open Tampermonkey Dashboard
2. Click the "Create a new script" button (+ icon)
3. Replace the default template with the following code:

```javascript
// ==UserScript==
// @name         D&D Beyond Toolbelt PROD
// @namespace    http://tampermonkey.net/
// @version      2025-08-02
// @description  Enhanced D&D Beyond character sheet with additional features
// @author       Alex Kollan
// @match        https://www.dndbeyond.com/characters/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dndbeyond.com
// @grant        none
// @require      https://raw.githubusercontent.com/alexkollan/dndbeyond-toolbelt/refs/heads/main/dist/bundle.js
// ==/UserScript==
```

4. Save the script (Ctrl+S)
5. Navigate to any D&D Beyond character page
6. The toolbelt button should appear in the character header

## Current Features

### 1. Spell Enhancements
- **Hide Upcasted Spells**: Toggle to show only base-level versions of spells, hiding upcasted duplicates for cleaner spell lists
- **Smart Filtering**: Automatically detects and hides spell variants that are just higher-level versions of the same spell

### 2. Add Extra Spells
- **Custom Spell Integration**: Adds powerful spells to your spell lists that you can cast via Wish or other means
- **Clickable Spell Links**: Each spell name links directly to its D&D Beyond description page
- **Visual Distinction**: Extra spells have dark purple "Cast" buttons to distinguish them from regular spells
- **Pre-configured Spell Library**: Includes essential high-level spells like:
  - **Utility**: Find Familiar, Leomund's Tiny Hut, Dimension Door, Mordenkainen's Magnificent Mansion
  - **Control**: Counterspell, Banishment, Wall of Force, Forcecage, Otto's Irresistible Dance
  - **Damage**: Disintegrate, Animate Objects, Bigby's Hand
  - **Protection**: Heal, Mass Cure Wounds, Mind Blank, Clone
  - **Battlefield Control**: Web, Maze, Feeblemind, Mirage Arcane

## Architecture

### Component Structure
The toolbelt follows a modular architecture that allows for easy feature development and management:

```
src/
├── index.js                 # Main entry point and initialization
├── styles.css              # Global styles
├── components/             # UI Components
│   ├── ToolbeltApp.js      # Main application container
│   ├── ToolbeltButton.js   # Header button component
│   └── ControlPanel.js     # Feature management panel
├── features/               # Feature modules
│   ├── FeatureManager.js   # Central feature management
│   ├── spellEnhancements/  # Spell enhancement feature
│   └── addExtraSpells/     # Extra spells feature
└── utils/                  # Utility modules
    └── TabDetector.js      # Detects D&D Beyond tab changes
```

### Feature System
Each feature is implemented as a self-contained module with a consistent interface:

```javascript
class ExampleFeature {
  constructor() {
    this.name = 'Feature Name';
    this.description = 'Feature description';
    this.initialized = false;
  }

  // Called when feature is first enabled
  init() {
    // Initialize feature
    this.initialized = true;
  }

  // Called when D&D Beyond tabs change
  onTabChange(tabName, isActive) {
    // Respond to tab changes
  }

  // Called when feature is disabled (optional)
  disable() {
    // Clean up feature
  }
}
```

### Key Components

#### FeatureManager
- Manages all features centrally
- Handles feature enabling/disabling
- Persists feature states in localStorage
- Coordinates tab change notifications

#### TabDetector
- Monitors D&D Beyond's tab system using MutationObserver
- Notifies features when users switch between tabs (Spells, Inventory, etc.)
- Handles dynamic content loading

#### Component Architecture
- **ToolbeltApp**: Main container that manages the overall application state
- **ToolbeltButton**: The floating button in the character header
- **ControlPanel**: Feature management interface with toggles and descriptions

### Feature Development
To create a new feature:

1. Create a new directory in `src/features/`
2. Implement the feature class with required methods
3. Register the feature in `FeatureManager.js`
4. Add any UI components or styles as needed

Features can respond to:
- Tab changes (onTabChange)
- Feature enabling/disabling
- Custom events and DOM interactions

## Development

### Local Development
```bash
git clone https://github.com/alexkollan/dndbeyond-toolbelt.git
cd dndbeyond-toolbelt
npm install
npm run dev
```

### Building
```bash
npm run build
```

This creates `dist/bundle.js` which is loaded by the Tampermonkey script.

## License

MIT License - see LICENSE file for details.
