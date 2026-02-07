// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Contact form submission
const contactForm = document.getElementById('contactMeForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        const email = document.getElementById('email').value;

        fetch("http://localhost:5000/api/sendMessage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                subject,
                message,
                email
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const success = data.success;
            const message = data.message;

            if (!success) {
                return alert(message);
            }

            if (success) {
                alert(message);

                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>Thank you for your message! I'll get back to you soon.</p>
                `;

                // Check if there's already a success message
                const existingMessage = contactForm.querySelector('.success-message');
                if (existingMessage) {
                    existingMessage.remove();
                }
                
                contactForm.appendChild(successMessage);
                successMessage.style.display = 'block';

                // Reset form
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    setTimeout(() => {
                        successMessage.remove();
                    }, 300);
                }, 5000);
            }
        })
        .catch(error => {
            console.log(`Fetching error: ${error}`);
        });
    });
}

// Update current year in footer
const currentYear = new Date().getFullYear();
const yearElement = document.getElementById('currentYear');
if (yearElement) {
    yearElement.textContent = currentYear;
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add animation to elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe all service and project cards
document.querySelectorAll('.service-card, .project-card, .social-card').forEach(card => {
    observer.observe(card);
});

// Form validation
// function validateForm() {
//     const subject = document.getElementById('subject');
//     const message = document.getElementById('message');
//     const email = document.getElementById('email');
    
//     let isValid = true;
    
//     // Reset previous error styles
//     [subject, message, email].forEach(input => {
//         input.style.borderColor = '';
//     });
    
//     // Validate subject
//     if (!subject.value.trim()) {
//         subject.style.borderColor = 'var(--danger)';
//         isValid = false;
//     }
    
//     // Validate message
//     if (!message.value.trim()) {
//         message.style.borderColor = 'var(--danger)';
//         isValid = false;
//     }
    
//     // Validate email
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!email.value.trim() || !emailRegex.test(email.value)) {
//         email.style.borderColor = 'var(--danger)';
//         isValid = false;
//     }
    
//     return isValid;
// }

// // Attach validation to form
// if (contactForm) {
//     contactForm.addEventListener('submit', function(e) {
//         if (!validateForm()) {
//             e.preventDefault();
//             return false;
//         }
//     });
// }

document.querySelector("#store").addEventListener("click", () => {
    alert("Coming Soon!");
});