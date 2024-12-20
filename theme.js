// theme.js
class ThemeManager {
  constructor() {
      this.themeToggle = document.getElementById('themeToggle');
      this.body = document.body;
      this.theme = localStorage.getItem('theme') || 'light';
      
      this.initialize();
  }

  initialize() {
      // Set initial theme
      this.setTheme(this.theme);

      // Add event listener
      this.themeToggle.addEventListener('click', () => {
          this.toggleTheme();
      });
  }

  setTheme(theme) {
      this.body.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      this.theme = theme;

      // Update icon
      const icon = this.themeToggle.querySelector('i');
      if (theme === 'dark') {
          icon.classList.remove('fa-moon');
          icon.classList.add('fa-sun');
      } else {
          icon.classList.remove('fa-sun');
          icon.classList.add('fa-moon');
      }
  }

  toggleTheme() {
      const newTheme = this.theme === 'light' ? 'dark' : 'light';
      this.setTheme(newTheme);

      // Add animation effect
      this.body.style.animation = 'themeTransition 0.5s ease';
      setTimeout(() => {
          this.body.style.animation = '';
      }, 500);
  }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
});