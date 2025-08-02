# D&D Beyond Toolbelt

A comprehensive toolbelt userscript for D&D Beyond that enhances your tabletop gaming experience with additional features and UI improvements.

## Features

- **Auto Roll Dice**: Add advantage/disadvantage buttons to dice rolls
- **Quick Spell Access**: Fast spell casting with keyboard shortcuts
- **Enhanced UI**: Dark mode toggle, collapsible sections, and floating action buttons
- **Damage Calculator**: Enhanced damage calculation tools
- **Initiative Tracker**: Track initiative order in combat
- **Character Sync**: Sync character data across devices
- **Custom Macros**: Create and use custom action macros

## Development Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/alexkollan/dndbeyond-toolbelt.git
cd dndbeyond-toolbelt
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The development server will start at `http://localhost:3000` with hot reloading enabled.

### Building for Production

To build the Tampermonkey script:

```bash
npm run build
```

This will create:
- `dist/bundle.js` - The webpack bundle
- `dist/dndbeyond-toolbelt.user.js` - The complete Tampermonkey script

## Installation in Tampermonkey

1. Install [Tampermonkey](https://www.tampermonkey.net/) browser extension
2. Build the project: `npm run build`
3. Copy the contents of `dist/dndbeyond-toolbelt.user.js`
4. Create a new script in Tampermonkey and paste the contents
5. Save and enable the script
6. Visit any D&D Beyond character page

## Development Mode with Hot Reloading

For development with live reloading:

1. Set `isDevelopment = true` in `tampermonkey-script.js`
2. Start the dev server: `npm run dev`
3. Install the development version in Tampermonkey
4. Changes will be automatically reloaded without rebuilding

## Architecture

The project uses a modular component architecture similar to React but with vanilla JavaScript:

- **Components**: UI components that manage their own DOM and events
- **Features**: Individual feature modules that can be enabled/disabled
- **FeatureManager**: Centralized feature management system
- **BaseFeature**: Base class providing common functionality for all features

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with the development server
5. Build and test the production bundle
6. Submit a pull request

## License

MIT License - see LICENSE file for details
