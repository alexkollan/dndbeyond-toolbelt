// ==UserScript==
// @name         D&D Beyond Toolbelt
// @namespace    https://github.com/alexkollan/dndbeyond-toolbelt
// @version      1.0.0
// @description  A comprehensive toolbelt for D&D Beyond with various enhancements
// @author       Alex Kollan
// @match        https://www.dndbeyond.com/characters/*
// @match        https://dndbeyond.com/characters/*
// @grant        none
// @run-at       document-end
// @updateURL    https://github.com/alexkollan/dndbeyond-toolbelt/raw/main/dist/dndbeyond-toolbelt.user.js
// @downloadURL  https://github.com/alexkollan/dndbeyond-toolbelt/raw/main/dist/dndbeyond-toolbelt.user.js
// ==/UserScript==

(function() {
    'use strict';
    
    // For development: Load from webpack dev server
    const isDevelopment = false; // Set to true during development
    const DEV_SERVER_URL = 'http://localhost:3000/bundle.js';
    
    function loadScript(src, callback) {
        const script = document.createElement('script');
        script.src = src;
        script.onload = callback;
        script.onerror = () => {
            console.error('Failed to load D&D Beyond Toolbelt script from:', src);
            if (isDevelopment) {
                console.log('Development server might not be running. Start it with: npm run dev');
            }
        };
        document.head.appendChild(script);
    }
    
    function initializeToolbelt() {
        if (isDevelopment) {
            // Development mode: load from dev server with hot reloading
            loadScript(DEV_SERVER_URL, () => {
                if (window.DNDBeyondToolbelt) {
                    window.DNDBeyondToolbelt.init();
                }
            });
        } else {
            // Production mode: bundle will be injected here by build process
            // BUNDLE_PLACEHOLDER - This will be replaced during build
            console.log('D&D Beyond Toolbelt loaded in production mode');
        }
    }
    
    // Initialize when page is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeToolbelt);
    } else {
        initializeToolbelt();
    }
})();
