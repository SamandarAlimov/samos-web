document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (!menuToggle || !navLinks) {
        console.error('Xato: menu-toggle yoki nav-links topilmadi!');
        console.log('menuToggle:', menuToggle);
        console.log('navLinks:', navLinks);
        return;
    }

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        console.log('Menu toggled! Nav-links classList:', navLinks.classList);
    });
});