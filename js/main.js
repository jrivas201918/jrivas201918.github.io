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
    const professions = ['Web Developer', 'UI/UX Designer', 'Freelancer'];
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
        anchor.addEventListener('click', function(e) {
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
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = {
                name: this.querySelector('input[name="name"]').value,
                email: this.querySelector('input[name="email"]').value,
                subject: this.querySelector('input[name="subject"]').value,
                message: this.querySelector('textarea[name="message"]').value
            };
            
            // Here you would typically send the data to your server or email service
            // For demonstration, we'll log it and show a success message
            console.log('Form data:', formData);
            
            // Show success message
            const formElements = contactForm.querySelectorAll('input, textarea, button');
            formElements.forEach(el => el.disabled = true);
            
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Your message has been sent successfully!';
            successMessage.style.color = 'green';
            successMessage.style.padding = '15px 0';
            contactForm.appendChild(successMessage);
            
            // Reset form after a delay
            setTimeout(() => {
                contactForm.reset();
                formElements.forEach(el => el.disabled = false);
                successMessage.remove();
            }, 3000);
        });
    }
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.about-image, .about-text, .skill-category, .project-card, .contact-item, .contact-form');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        // Add initial animation class
        element.classList.add('fade-in');
        observer.observe(element);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .animated {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});