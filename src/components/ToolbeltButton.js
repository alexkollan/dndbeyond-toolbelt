class ToolbeltButton {
  constructor(onClick) {
    this.onClick = onClick;
    this.element = null;
  }

  render() {
    if (this.element) {
      return this.element;
    }

    // Create the button following D&D Beyond's exact structure
    this.element = document.createElement('div');
    this.element.className = 'ct-character-header-desktop__button toolbelt-button';
    this.element.setAttribute('role', 'button');
    this.element.setAttribute('tabindex', '0');
    
    this.element.innerHTML = `
      <div class="ct-character-header-desktop__button-icon">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 50 50" 
          class="ddbc-svg ddbc-toolbelt-svg ddbc-svg--themed"
        >
          <path 
            fill="#53a5c5" 
            d="M25 5c-11 0-20 9-20 20s9 20 20 20 20-9 20-20S36 5 25 5zm0 36c-8.8 0-16-7.2-16-16S16.2 9 25 9s16 7.2 16 16-7.2 16-16 16z"
          />
          <path 
            fill="#53a5c5" 
            d="M32 18h-5v-5c0-1.1-.9-2-2-2s-2 .9-2 2v5h-5c-1.1 0-2 .9-2 2s.9 2 2 2h5v5c0 1.1.9 2 2 2s2-.9 2-2v-5h5c1.1 0 2-.9 2-2s-.9-2-2-2z"
          />
        </svg>
      </div>
      <span class="ct-character-header-desktop__button-label">Toolbelt</span>
    `;

    // Add click event listener
    this.element.addEventListener('click', this.onClick);
    
    // Add keyboard event listener
    this.element.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.onClick();
      }
    });

    return this.element;
  }
}

export default ToolbeltButton;
