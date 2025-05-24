// Smooth scrolling for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Show/hide scroll to top button
        window.addEventListener('scroll', function() {
            const scrollTop = document.getElementById('scroll-top');
            if (window.pageYOffset > 300) {
                scrollTop.classList.add('visible');
            } else {
                scrollTop.classList.remove('visible');
            }
        });

        function scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function addRecommendation() {
            const nameInput = document.getElementById('recommender-name');
            const textInput = document.getElementById('recommendation-text');
            
            if (textInput.value.trim() !== '') {
                const recommendationsGrid = document.getElementById('recommendations-grid');
                
                // Remove the placeholder if it exists
                const placeholder = recommendationsGrid.querySelector('.recommendation-card');
                if (placeholder && placeholder.textContent.includes('Share your thoughts')) {
                    placeholder.remove();
                }
                
                // Create new recommendation card
                const newRecommendation = document.createElement('div');
                newRecommendation.className = 'recommendation-card';
                
                const name = nameInput.value.trim() || 'Anonymous';
                newRecommendation.innerHTML = `
                    <div style="position: relative;">
                        <div style="font-size: 2rem; color: var(--purple); margin-bottom: 1rem;">"</div>
                        <p style="font-style: italic; margin-bottom: 1rem;">${textInput.value}</p>
                        <div style="text-align: right; color: var(--purple); font-weight: 600;">— ${name}</div>
                    </div>
                `;
                
                recommendationsGrid.appendChild(newRecommendation);
                
                // Clear inputs
                nameInput.value = '';
                textInput.value = '';
                
                // Show popup
                showPopup();
            }
        }

        function showPopup() {
            document.getElementById('popup').classList.add('visible');
        }

        function hidePopup() {
            document.getElementById('popup').classList.remove('visible');
        }

        // Add some interactive animations on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all sections for scroll animations
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
            section.style.transition = 'all 0.6s ease-out';
            observer.observe(section);
        });

        // Hero section should be visible immediately
        document.getElementById('hero').style.opacity = '1';
        document.getElementById('hero').style.transform = 'translateY(0)';
