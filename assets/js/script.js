// Hero Slider functionality
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

if (slides.length > 0 && dots.length > 0) {
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Add click event to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Start automatic slideshow
    setInterval(nextSlide, 4000);
}

// Gallery functionality
const galleryLink = document.querySelector('.gallery-link');
const gallerySection = document.querySelector('.gallery-section');
const modal = document.querySelector('.gallery-modal');
const modalImg = document.querySelector('.modal-content');
const modalCaption = document.querySelector('.modal-caption');
const closeBtn = document.querySelector('.modal-close');
const prevBtn = document.querySelector('.modal-prev');
const nextBtn = document.querySelector('.modal-next');
const galleryItems = document.querySelectorAll('.gallery-item');
let activeGalleryItems = [];
let currentImageIndex = 0;

if (galleryLink && gallerySection) {
    // Show gallery section when clicking gallery link
    galleryLink.addEventListener('click', (e) => {
        e.preventDefault();
        gallerySection.scrollIntoView({ behavior: 'smooth' });
    });
}

// Sports gallery "See More" toggle
const sportsSeeMoreBtn = document.getElementById('sports-see-more');
const sportsGalleryGrid = document.getElementById('sports-gallery-grid');
if (sportsSeeMoreBtn && sportsGalleryGrid) {
    sportsSeeMoreBtn.addEventListener('click', () => {
        sportsGalleryGrid.querySelectorAll('.gallery-item--hidden').forEach((item) => {
            item.classList.remove('gallery-item--hidden');
        });
        sportsSeeMoreBtn.style.display = 'none';
    });
}

if (galleryItems.length > 0 && modal && modalImg && modalCaption && closeBtn && prevBtn && nextBtn) {
    function getVisibleGalleryItems(grid) {
        return Array.from(grid.querySelectorAll('.gallery-item')).filter(
            (item) => !item.classList.contains('gallery-item--hidden')
        );
    }

    // Open modal when clicking gallery items
    galleryItems.forEach((item) => {
        item.addEventListener('click', () => {
            const grid = item.closest('.gallery-grid');
            activeGalleryItems = grid ? getVisibleGalleryItems(grid) : [];
            currentImageIndex = activeGalleryItems.indexOf(item);
            openModal(currentImageIndex);
        });
    });

    function openModal(index) {
        const img = activeGalleryItems[index].querySelector('img');
        modalImg.src = img.src;
        modalCaption.textContent = img.alt;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + activeGalleryItems.length) % activeGalleryItems.length;
        openModal(currentImageIndex);
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % activeGalleryItems.length;
        openModal(currentImageIndex);
    }

    // Event listeners for modal controls
    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'ArrowRight') showNextImage();
        }
    });
}

// Hamburger menu for main-navbar
const mainHamburger = document.querySelector('.main-hamburger');
const mainNavMenu = document.querySelector('.main-nav-menu');
const mainNavItems = document.querySelectorAll('.main-nav-menu .nav-item');
if (mainHamburger && mainNavMenu) {
    mainHamburger.addEventListener('click', () => {
        mainHamburger.classList.toggle('active');
        mainNavMenu.classList.toggle('active');
        if (mainNavMenu.classList.contains('active')) {
            mainNavItems.forEach((item, idx) => {
                setTimeout(() => {
                    item.classList.add('nav-item-animate');
                }, idx * 100); // 100ms stagger
            });
        } else {
            mainNavItems.forEach((item) => {
                item.classList.remove('nav-item-animate');
            });
        }
    });
}
