// Ajouter la classe loading au body immédiatement
document.body.classList.add('loading');

document.addEventListener('DOMContentLoaded', () => {
    // Effet Typing automatique
    const text = document.getElementById('typing');
    const phrases = ["Portfolio", "Parcours", "Univers"];
    let i = 0;
    let j = 0;
    let current = "";
    let isDeleting = false;

    function typeEffect() {
        const currentPhrase = phrases[i];

        if (isDeleting) {
            current = currentPhrase.substring(0, j - 1);
            j--;
        } else {
            current = currentPhrase.substring(0, j + 1);
            j++;
        }

        if (text) {
            text.innerHTML = current;
        }

        let speed = isDeleting ? 100 : 200;

        if (!isDeleting && j === currentPhrase.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && j === 0) {
            isDeleting = false;
            i = (i + 1) % phrases.length;
            speed = 500;
        }
        setTimeout(typeEffect, speed);
    }

    typeEffect();

    // Menu hamburger
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Fermer le menu au clic sur un lien
        const navLinksItems = document.querySelectorAll('.nav-links a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Changement de style Navbar au scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (!nav) return;

        if (window.scrollY > 50) {
            nav.style.padding = '15px 8%';
            nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
        } else {
            nav.style.padding = '25px 8%';
            nav.style.boxShadow = 'none';
        }
    });

    // Scroll fluide sur les liens du menu
    const links = document.querySelectorAll('.nav-links a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Indicateur de section active dans le menu
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinksAll.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Animations au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animer les barres de progression
                if (entry.target.classList.contains('skill-progress')) {
                    const width = entry.target.getAttribute('data-width');
                    setTimeout(() => {
                        entry.target.style.width = width + '%';
                    }, 200);
                }
            }
        });
    }, observerOptions);

    // Observer les éléments avec animations
    document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
        observer.observe(el);
    });

    // Observer les barres de progression
    document.querySelectorAll('.skill-progress').forEach(bar => {
        observer.observe(bar);
    });

    // Bouton retour en haut
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Toggle thème clair / sombre avec icône qui change
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle?.querySelector('i');

    // Charger le thème sauvegardé
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark');
        if (themeIcon) themeIcon.className = 'fas fa-sun';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark');
            const isDark = body.classList.contains('dark');
            
            if (themeIcon) {
                themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
            }
            
            // Sauvegarder le thème
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // Loader
    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.classList.remove('loading');
            }, 800);
        });
    }

    // Particules animées dans le hero - Animation continue et fluide
    const canvas = document.getElementById('particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let animationId = null;
        let particles = [];
        const particleCount = 60;
        const connectionDistance = 120;

        function initCanvas() {
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                const rect = heroSection.getBoundingClientRect();
                canvas.width = rect.width;
                canvas.height = rect.height;
            } else {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        }

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.4 + 0.1;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Rebondir sur les bords pour un mouvement continu
                if (this.x > canvas.width || this.x < 0) {
                    this.speedX *= -1;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.speedY *= -1;
                }

                // S'assurer que les particules restent dans le canvas
                this.x = Math.max(0, Math.min(canvas.width, this.x));
                this.y = Math.max(0, Math.min(canvas.height, this.y));
            }

            draw() {
                ctx.fillStyle = `rgba(79, 70, 229, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function drawConnections() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        const opacity = (1 - distance / connectionDistance) * 0.2;
                        ctx.strokeStyle = `rgba(79, 70, 229, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Dessiner les connexions
            drawConnections();
            
            // Mettre à jour et dessiner les particules
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            animationId = requestAnimationFrame(animate);
        }

        function startAnimation() {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            initCanvas();
            if (particles.length === 0) {
                initParticles();
            }
            animate();
        }

        // Démarrer l'animation
        startAnimation();

        // Gérer le redimensionnement
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                initCanvas();
                // Réinitialiser les positions des particules si nécessaire
                particles.forEach(particle => {
                    if (particle.x > canvas.width || particle.y > canvas.height) {
                        particle.reset();
                    }
                });
            }, 250);
        });

        // Observer pour s'assurer que l'animation continue même si la section est visible
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!animationId) {
                        startAnimation();
                    }
                }
            });
        }, { threshold: 0 });

        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroObserver.observe(heroSection);
        }
    }

    // Compteur animé pour les statistiques
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 30);
    }

    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Formulaire de contact
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Désactiver le bouton
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            
            // Simuler l'envoi (remplacer par une vraie requête API)
            setTimeout(() => {
                formMessage.className = 'form-message success';
                formMessage.textContent = 'Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.';
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                
                // Masquer le message après 5 secondes
                setTimeout(() => {
                    formMessage.className = 'form-message';
                    formMessage.textContent = '';
                }, 5000);
            }, 1500);

            // Pour une vraie implémentation, utiliser :
            /*
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();
                if (data.success) {
                    formMessage.className = 'form-message success';
                    formMessage.textContent = 'Message envoyé avec succès !';
                    contactForm.reset();
                } else {
                    throw new Error(data.message);
                }
            } catch (error) {
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Erreur lors de l\'envoi. Veuillez réessayer.';
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
            */
        });
    }
});