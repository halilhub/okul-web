
document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    const mobileToggle = document.getElementById('mobile-toggle');
    const navList = document.querySelector('.nav-list');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navList.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-right');
    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });
    const sections = document.querySelectorAll('section, footer');
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.classList.add('active');
            }
        });
        if (scrollY < 200) {
           navLinks.forEach(l => l.classList.remove('active'));
           navLinks[0].classList.add('active');
        }
    });
    const modalOverlay = document.getElementById('news-modal');
    const modalCloseBtn = document.getElementById('modal-close');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach(card => {
        const button = card.querySelector('.modal-open-btn');
        const openModal = (e) => {
            e.preventDefault();
            const title = card.getAttribute('data-title');
            const content = card.getAttribute('data-content');
            const imageStr = card.getAttribute('data-image');
            modalTitle.textContent = title;
            modalText.textContent = content;
            modalImage.src = imageStr;
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        };
        card.addEventListener('click', openModal);
        if (button) {
            button.addEventListener('click', (e) => {
                e.stopPropagation(); 
                openModal(e);
            });
        }
    });
    const closeModal = () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
});
