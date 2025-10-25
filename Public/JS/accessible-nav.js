/**
 * Accessible Navigation Menu
 * Implements keyboard support, focus trap, mobile menu enhancements,
 * Bootstrap dropdown initialization, active navigation highlighting,
 * smooth scrolling, and navbar scroll effects
 */
(function() {
  'use strict';

  let isMenuOpen = false;
  let focusableElements = [];
  let firstFocusable = null;
  let lastFocusable = null;

  document.addEventListener('DOMContentLoaded', function() {
    initializeNavbar();
    initializeBootstrapDropdowns();
    initializeActiveNavigation();
    initializeSmoothScrolling();
    initializeScrollEffect();
  });

  function initializeNavbar() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('#navbarNav');
    const body = document.body;

    if (!navbarToggler || !navbarCollapse) return;

    // Keyboard support for toggler button
    navbarToggler.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });

    // Click support for toggler button
    navbarToggler.addEventListener('click', function(e) {
      e.preventDefault();
      toggleMenu();
    });

    // ESC key to close menu
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
        navbarToggler.focus();
      }
    });

    // Focus trap
    navbarCollapse.addEventListener('keydown', function(e) {
      if (!isMenuOpen) return;

      if (e.key === 'Tab') {
        if (focusableElements.length === 0) return;

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (isMenuOpen && 
          !navbarCollapse.contains(e.target) && 
          !navbarToggler.contains(e.target)) {
        closeMenu();
      }
    });

    // Close menu when nav link is clicked (mobile)
    const navLinks = navbarCollapse.querySelectorAll('.nav-link, .dropdown-item');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        if (window.innerWidth < 992 && isMenuOpen) {
          closeMenu();
        }
      });
    });

    // Dropdown keyboard navigation
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(function(toggle) {
      toggle.addEventListener('keydown', function(e) {
        const dropdownMenu = this.nextElementSibling;
        
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const isExpanded = this.getAttribute('aria-expanded') === 'true';
          this.setAttribute('aria-expanded', !isExpanded);
          dropdownMenu.classList.toggle('show');
          
          if (!isExpanded) {
            const firstItem = dropdownMenu.querySelector('.dropdown-item');
            if (firstItem) firstItem.focus();
          }
        }
        
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const isExpanded = this.getAttribute('aria-expanded') === 'true';
          if (!isExpanded) {
            this.setAttribute('aria-expanded', 'true');
            dropdownMenu.classList.add('show');
          }
          const firstItem = dropdownMenu.querySelector('.dropdown-item');
          if (firstItem) firstItem.focus();
        }
      });
    });

    // Dropdown item keyboard navigation
    document.querySelectorAll('.dropdown-item').forEach(function(item) {
      item.addEventListener('keydown', function(e) {
        const dropdown = this.closest('.dropdown-menu');
        const items = Array.from(dropdown.querySelectorAll('.dropdown-item'));
        const currentIndex = items.indexOf(this);
        
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % items.length;
          items[nextIndex].focus();
        }
        
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
          items[prevIndex].focus();
        }
        
        if (e.key === 'Escape') {
          e.preventDefault();
          const toggle = dropdown.previousElementSibling;
          toggle.setAttribute('aria-expanded', 'false');
          dropdown.classList.remove('show');
          toggle.focus();
        }
      });
    });

    function toggleMenu() {
      if (isMenuOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    function openMenu() {
      isMenuOpen = true;
      navbarCollapse.classList.add('show');
      navbarToggler.setAttribute('aria-expanded', 'true');
      
      // Lock body scroll on mobile
      if (window.innerWidth < 992) {
        body.style.overflow = 'hidden';
        body.style.position = 'fixed';
        body.style.width = '100%';
      }

      // Update focusable elements
      updateFocusableElements();
      
      // Focus first menu item
      if (firstFocusable) {
        setTimeout(function() {
          firstFocusable.focus();
        }, 100);
      }
    }

    function closeMenu() {
      isMenuOpen = false;
      navbarCollapse.classList.remove('show');
      navbarToggler.setAttribute('aria-expanded', 'false');
      
      // Unlock body scroll
      body.style.overflow = '';
      body.style.position = '';
      body.style.width = '';
      
      // Close any open dropdowns
      document.querySelectorAll('.dropdown-menu.show').forEach(function(menu) {
        menu.classList.remove('show');
        const toggle = menu.previousElementSibling;
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      });
    }

    function updateFocusableElements() {
      const selector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
      focusableElements = Array.from(navbarCollapse.querySelectorAll(selector));
      firstFocusable = focusableElements[0] || null;
      lastFocusable = focusableElements[focusableElements.length - 1] || null;
    }

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function() {
        if (window.innerWidth >= 992 && isMenuOpen) {
          closeMenu();
        }
      }, 150);
    });
  }

  function initializeBootstrapDropdowns() {
    // Initialize Bootstrap dropdowns only if jQuery and Bootstrap are loaded
    if (typeof jQuery !== 'undefined' && jQuery.fn.dropdown) {
      jQuery('.dropdown-toggle').dropdown();
      console.log("✅ Bootstrap Dropdowns Initialized");
    } else {
      console.warn("⚠️ jQuery or Bootstrap not loaded - dropdowns may not function");
    }
  }

  function initializeActiveNavigation() {
    // Add active class to current page in navigation
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(function(link) {
      const linkPath = link.getAttribute('href');
      if (linkPath === '/' && currentLocation === '/') {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else if (linkPath !== '/' && currentLocation.includes(linkPath)) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  function initializeSmoothScrolling() {
    // Smooth scrolling for anchor links (requires jQuery)
    if (typeof jQuery !== 'undefined') {
      jQuery('a[href^="#"]').on('click', function(e) {
        if (this.hash !== "") {
          e.preventDefault();
          var hash = this.hash;
          jQuery('html, body').animate({
            scrollTop: jQuery(hash).offset().top - 100
          }, 800, function() {
            window.location.hash = hash;
          });
        }
      });
    }
  }

  function initializeScrollEffect() {
    // Add 'scrolled' class to navbar on scroll
    const navbar = document.querySelector('.navbar-main');
    if (!navbar) return;

    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
})();
