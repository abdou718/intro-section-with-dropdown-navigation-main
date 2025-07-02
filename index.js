const dropdownLeft = document.querySelector('.dropdown-left');
const dropdownRight = document.querySelector('.dropdown-right');
const dropdownContentLeft = document.querySelector('.content-left');
const dropdownContentRight = document.querySelector('.content-right');
let isDropdownOpenLeft = false;
let isDropdownOpenRight = false;

let arrowIconLeft = document.querySelector('.dropdown-left .arrow-icon');

let arrowUpRight = document.querySelector('.arrow-icon-up');
let arrowDownRight = document.querySelector('.arrow-icon-down');

dropdownLeft.addEventListener('click', () => {
    if (isDropdownOpenLeft) {
        dropdownContentLeft.style.display = 'none';
        isDropdownOpenLeft = false;
        if (arrowIconLeft) {
            arrowIconLeft.src = '/Assets/icon-arrow-down.svg';
        }
    } else {
        dropdownContentLeft.style.display = 'flex';
        isDropdownOpenLeft = true;
        if (arrowIconLeft) {
            arrowIconLeft.src = '/Assets/icon-arrow-up.svg';
        }
    }
});
dropdownRight.addEventListener('click', () => {
    if (isDropdownOpenRight) {
        dropdownContentRight.style.display = 'none';
        isDropdownOpenRight = false;
        if (arrowDownRight && arrowUpRight) {
            arrowDownRight.style.display = 'inline';
            arrowUpRight.style.display = 'none';
        }
    } else {
        dropdownContentRight.style.display = 'block';
        isDropdownOpenRight = true;
        if (arrowDownRight && arrowUpRight) {
            arrowDownRight.style.display = 'none';
            arrowUpRight.style.display = 'inline';
        }
    }
});
let menuIcon = document.querySelector('.menu-icon');
let nav = document.querySelector('nav');
let authButton = document.querySelector('.auth-buttons');
let isMenuOpen = false;

// Add backdrop functionality
let backdrop = null;

function closeMobileMenu() {
    // Remove mobile menu classes and let CSS handle display
    nav.classList.remove('mobile-menu');
    authButton.classList.remove('mobile-menu');
    menuIcon.src = '/Assets/icon-menu.svg';
    if (backdrop) {
        backdrop.style.display = 'none';
    }
    isMenuOpen = false;
    
    // Only hide on mobile viewport
    if (window.innerWidth <= 768) {
        nav.style.display = 'none';
        authButton.style.display = 'none';
    }
}

function createBackdrop() {
    backdrop = document.createElement('div');
    backdrop.className = 'menu-backdrop';
    backdrop.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999;
        display: none;
    `;
    document.body.appendChild(backdrop);
    
    backdrop.addEventListener('click', () => {
        // Close menu when clicking backdrop
        closeMobileMenu();
    });
}

// Create backdrop on page load
createBackdrop();

menuIcon.addEventListener('click', () => {
    if (isMenuOpen) {
        // Close menu
        closeMobileMenu();
    } else {
        // Open menu
        nav.style.display = 'flex';
        nav.classList.add('mobile-menu');
        authButton.style.display = 'flex';
        authButton.classList.add('mobile-menu');
        menuIcon.src = '/Assets/icon-close-menu.svg';
        backdrop.style.display = 'block';
        isMenuOpen = true;
    }
});

// Handle viewport changes
function handleViewportChange() {
    const isMobile = window.innerWidth <= 768;
    
    if (!isMobile) {
        // Reset mobile menu when switching to desktop
        nav.style.display = '';
        nav.classList.remove('mobile-menu');
        authButton.style.display = '';
        authButton.classList.remove('mobile-menu');
        menuIcon.src = '/Assets/icon-menu.svg';
        if (backdrop) {
            backdrop.style.display = 'none';
        }
        isMenuOpen = false;
    }
}

// Listen for window resize events
window.addEventListener('resize', handleViewportChange);

// Check on page load
window.addEventListener('load', handleViewportChange);