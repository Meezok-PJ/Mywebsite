document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for Scroll Entrance Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.15
    };

    const animateObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Once animated, unobserve to prevent unneeded recalculations
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el, index) => {
        // Optional staggered animation delay based on sibling index
        el.style.transitionDelay = `${(index % 4) * 0.1}s`;
        animateObserver.observe(el);
    });

    // 2. Active Navigation Indicator on Scroll
    const sections = document.querySelectorAll('section[id], header');
    const navLinks = document.querySelectorAll('.nav-link');

    const navObserverOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach((link) => {
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach((section) => {
        navObserver.observe(section);
    });

    // 3. Smooth Scrolling for Internal Links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId) return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile nav if open
                const navMenu = document.getElementById('nav-menu');
                if (navMenu && navMenu.classList.contains('is-active')) {
                    navMenu.classList.remove('is-active');
                }

                const headerOffset = 72;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('is-active');
        });

        // Close mobile nav when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('is-active');
            }
        });
    }

    // 5. Header Scroll Shadow Effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.5)';
            } else {
                header.style.boxShadow = 'none';
            }
        }, { passive: true });
    }
});