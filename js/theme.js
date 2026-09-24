/**
 * PROFLIC Technologies — Theme Controller
 * Manages Dark/Light mode persistence, system preference synchronization,
 * and broadcasts theme change events for canvas re-renders.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'proflic_theme';
  const htmlEl = document.documentElement;

  // Detect initial theme: stored preference > system preference > default dark
  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      htmlEl.classList.add('light');
      htmlEl.classList.remove('dark');
    } else {
      htmlEl.classList.add('dark');
      htmlEl.classList.remove('light');
    }
    localStorage.setItem(STORAGE_KEY, theme);

    // Update all theme toggle buttons
    updateToggleButtons(theme);

    // Broadcast event for Canvas & HUD components to repaint
    window.dispatchEvent(new CustomEvent('proflic:theme-changed', {
      detail: { theme: theme }
    }));
  }

  function updateToggleButtons(theme) {
    const toggles = document.querySelectorAll('.theme-toggle-btn');
    toggles.forEach(btn => {
      const icon = btn.querySelector('.theme-icon');
      const label = btn.querySelector('.theme-label');
      if (theme === 'light') {
        if (icon) icon.className = 'fa-solid fa-moon text-amber-500 theme-icon';
        if (label) label.textContent = 'Dark Mode';
        btn.setAttribute('aria-label', 'Switch to Dark Mode');
      } else {
        if (icon) icon.className = 'fa-solid fa-sun text-amber-400 theme-icon';
        if (label) label.textContent = 'Light Mode';
        btn.setAttribute('aria-label', 'Switch to Light Mode');
      }
    });
  }

  function toggleTheme() {
    const current = htmlEl.classList.contains('light') ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
  }

  // Initialize immediately
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  // Listen for OS scheme changes if user hasn't explicitly set a preference
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? 'light' : 'dark');
      }
    });
  }

  // Setup DOM buttons once ready
  document.addEventListener('DOMContentLoaded', () => {
    updateToggleButtons(initialTheme);
    const toggles = document.querySelectorAll('.theme-toggle-btn');
    toggles.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleTheme();
      });
    });
  });

  // Global API
  window.proflicTheme = {
    get: () => htmlEl.classList.contains('light') ? 'light' : 'dark',
    set: applyTheme,
    toggle: toggleTheme
  };
})();
