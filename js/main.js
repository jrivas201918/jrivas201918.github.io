// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Typing effect
    const typedTextElement = document.querySelector('.typed-text');
    const professions = ['Aspiring Software Engineer', 'Java & C# Developer', 'Tech Problem Solver'];
    let professionIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 200;

    function typeEffect() {
        const currentProfession = professions[professionIndex];

        if (isDeleting) {
            // Remove characters
            typedTextElement.textContent = currentProfession.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 100;
        } else {
            // Add characters
            typedTextElement.textContent = currentProfession.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 200;
        }

        // If word is complete
        if (!isDeleting && charIndex === currentProfession.length) {
            isDeleting = true;
            typingDelay = 1000; // Pause at end of word
        }
        // If word is deleted
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            professionIndex = (professionIndex + 1) % professions.length;
            typingDelay = 500; // Pause before starting new word
        }

        setTimeout(typeEffect, typingDelay);
    }

    // Start typing effect if element exists
    if (typedTextElement) {
        setTimeout(typeEffect, 1000);
    }

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Adjust for header height

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Collect form data
            const formData = Object.fromEntries(new FormData(this).entries());

            try {
                // Send form data to the server
                const response = await fetch('http://192.168.1.37:8080/send-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (response.ok) {
                    showMessage('Your message has been sent successfully!', 'success');
                    this.reset();
                } else {
                    showMessage(data.message || 'An error occurred. Please try again.', 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                showMessage('Failed to send your message. Please try again later.', 'error');
            }
        });
    }

    // Utility function to show messages
    function showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `${type}-message`;
        messageDiv.textContent = message;
        messageDiv.style.color = type === 'success' ? 'green' : 'red';
        messageDiv.style.padding = '15px 0';
        contactForm.appendChild(messageDiv);

        // Remove message after a delay
        setTimeout(() => messageDiv.remove(), 3000);
    }
});