
        // Theme Toggle Functionality
        function toggleTheme() {
            const body = document.body;
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            body.setAttribute('data-theme', newTheme);
        }

        // Smooth Scrolling for Navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Enhanced Binary Animation
        function createBinaryRain() {
            const binaryBg = document.querySelector('.binary-bg');
            const binaryStrings = [
                '01001000 01100001 01100011 01101011',
                '01010011 01100101 01100011 01110101',
                '01010010 01100101 01100100 01010100',
                '01000010 01101100 01110101 01100101',
                '01010000 01110101 01110010 01110000',
                '11010011 10101010 01010101 11110000',
                '01010101 11001100 10101010 00110011'
            ];

            setInterval(() => {
                if (binaryBg.children.length < 20) {
                    const binaryEl = document.createElement('div');
                    binaryEl.className = 'binary-text';
                    binaryEl.textContent = binaryStrings[Math.floor(Math.random() * binaryStrings.length)];
                    binaryEl.style.left = Math.random() * 100 + '%';
                    binaryEl.style.animationDelay = '0s';
                    binaryEl.style.animationDuration = (10 + Math.random() * 10) + 's';
                    binaryBg.appendChild(binaryEl);

                    setTimeout(() => {
                        if (binaryEl.parentNode) {
                            binaryEl.parentNode.removeChild(binaryEl);
                        }
                    }, 20000);
                }
            }, 2000);
        }

        // Initialize binary rain effect
        createBinaryRain();

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Add typing effect to hero text
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all sections for scroll animations
        document.addEventListener('DOMContentLoaded', () => {
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(50px)';
                section.style.transition = 'all 0.8s ease';
                observer.observe(section);
            });
        });

        // Image Slider Interactions
        const sliderItems = document.querySelectorAll('.item');
        
        sliderItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                // Pause all other animations temporarily
                sliderItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.style.animationPlayState = 'paused';
                    }
                });
            });
            
            item.addEventListener('mouseleave', function() {
                // Resume all animations
                sliderItems.forEach(otherItem => {
                    otherItem.style.animationPlayState = 'running';
                });
            });
            
            // Add click event for additional interactivity
            item.addEventListener('click', function() {
                const img = item.querySelector('img');
                const altText = img.alt;
                
                // Create a temporary notification
                const notification = document.createElement('div');
                notification.textContent = `${altText} - Click to learn more!`;
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--purple-primary);
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 10px;
                    z-index: 10000;
                    font-size: 0.9rem;
                    box-shadow: var(--neon-glow);
                    animation: slideInRight 0.3s ease;
                `;
                
                document.body.appendChild(notification);
                
                // Remove notification after 3 seconds
                setTimeout(() => {
                    notification.style.animation = 'slideOutRight 0.3s ease';
                    setTimeout(() => {
                        document.body.removeChild(notification);
                    }, 300);
                }, 3000);
            });
        });
        
        // Add CSS for notification animations
        const notificationStyles = document.createElement('style');
        notificationStyles.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(notificationStyles);