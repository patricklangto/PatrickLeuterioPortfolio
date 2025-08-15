// Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const menuBar = document.getElementById('menuBar');
    const menuLinks = document.querySelectorAll('.menu-link');

    // Toggle menu visibility
    menuToggle.addEventListener('click', function() {
        menuBar.classList.toggle('hidden');
        
        // Update aria-label for accessibility
        if (menuBar.classList.contains('hidden')) {
            menuToggle.setAttribute('aria-label', 'Open navigation menu');
        } else {
            menuToggle.setAttribute('aria-label', 'Close navigation menu');
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!menuToggle.contains(event.target) && !menuBar.contains(event.target)) {
            menuBar.classList.add('hidden');
            menuToggle.setAttribute('aria-label', 'Open navigation menu');
        }
    });

    // Close menu when clicking on menu links
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuBar.classList.add('hidden');
            menuToggle.setAttribute('aria-label', 'Open navigation menu');
        });
    });

    // Smooth scrolling for navigation links
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form functionality
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simple form validation
            if (name && email && message) {
                formMessage.innerHTML = '<p style="color: #007aff;">Thank you for your message! I\'ll get back to you soon.</p>';
                contactForm.reset();
            } else {
                formMessage.innerHTML = '<p style="color: #ff3b30;">Please fill in all fields.</p>';
            }
        });
    }

    // active state to current section in navigation
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100; // Account for header height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.menu-link[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                menuLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current section link
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    });

    // Close menu on Escape key press
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && !menuBar.classList.contains('hidden')) {
            menuBar.classList.add('hidden');
            menuToggle.setAttribute('aria-label', 'Open navigation menu');
        }
    });

});
