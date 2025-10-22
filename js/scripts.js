/*!
* Start Bootstrap - Agency v7.0.10 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });


    // Portfolio horizontal scroller: add prev/next arrows and auto-scroll every 3s
    (function initPortfolioScroller() {
        const scroller = document.querySelector('.portfolio-scroll');
        if (!scroller) return;

        // Make sure the scroller is positioned to contain absolute controls
        if (getComputedStyle(scroller).position === 'static') {
            scroller.style.position = 'relative';
        }

        // Create nav buttons
        const btnBaseStyle = {
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 20,
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            background: 'rgba(0,0,0,0.45)',
            color: '#fff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
        };

        const prev = document.createElement('button');
        prev.setAttribute('type', 'button');
        prev.setAttribute('aria-label', 'Vorige');
        prev.className = 'portfolio-nav portfolio-prev';
        prev.innerHTML = '<i class="fas fa-chevron-left" aria-hidden="true"></i>';

        const next = document.createElement('button');
        next.setAttribute('type', 'button');
        next.setAttribute('aria-label', 'Volgende');
        next.className = 'portfolio-nav portfolio-next';
        next.innerHTML = '<i class="fas fa-chevron-right" aria-hidden="true"></i>';

        // Apply inline styles
        Object.assign(prev.style, btnBaseStyle, { left: '8px' });
        Object.assign(next.style, btnBaseStyle, { right: '8px' });

        // Ensure buttons are keyboard-focusable
        prev.tabIndex = 0;
        next.tabIndex = 0;

        // Insert buttons inside scroller so absolute positioning is relative to scroller
        scroller.appendChild(prev);
        scroller.appendChild(next);

        const firstSlide = scroller.querySelector('.portfolio-slide');
        const computed = getComputedStyle(scroller);
        const gap = parseInt(computed.gap || computed.columnGap || '16', 10) || 16;

        const getScrollAmount = () => {
            if (firstSlide) {
                return firstSlide.offsetWidth + gap;
            }
            // fallback
            return Math.round(scroller.clientWidth * 0.9);
        };

        let autoInterval = null;
        const AUTO_DELAY = 3000;
        let autoRunning = true;
        let lastAction = 0;
        const ACTION_DEBOUNCE = 300; // ms

        function scrollNext() {
            const now = Date.now();
            if (now - lastAction < ACTION_DEBOUNCE) return;
            lastAction = now;

            const amount = getScrollAmount();
            const maxScroll = scroller.scrollWidth - scroller.clientWidth;
            // If already near end, wrap to start
            if (scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 5) {
                scroller.scrollTo({ left: 0, behavior: 'smooth' });
                return;
            }
            scroller.scrollBy({ left: amount, behavior: 'smooth' });
        }

        function scrollPrev() {
            const now = Date.now();
            if (now - lastAction < ACTION_DEBOUNCE) return;
            lastAction = now;

            const amount = getScrollAmount();
            // If near start, wrap to end
            if (scroller.scrollLeft <= 5) {
                const to = scroller.scrollWidth - scroller.clientWidth;
                scroller.scrollTo({ left: to, behavior: 'smooth' });
                return;
            }
            scroller.scrollBy({ left: -amount, behavior: 'smooth' });
        }

        prev.addEventListener('click', () => {
            scrollPrev();
            pauseAuto();
        });
        next.addEventListener('click', () => {
            scrollNext();
            pauseAuto();
        });

        // Keyboard support when scroller has focus
        scroller.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                scrollPrev();
                pauseAuto();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                scrollNext();
                pauseAuto();
            }
        });

        // Pause auto on user interaction, resume on inactivity
        function startAuto() {
            if (autoInterval) clearInterval(autoInterval);
            autoInterval = setInterval(() => {
                scrollNext();
            }, AUTO_DELAY);
            autoRunning = true;
        }

        function stopAuto() {
            if (autoInterval) {
                clearInterval(autoInterval);
                autoInterval = null;
            }
            autoRunning = false;
        }

        function pauseAuto() {
            stopAuto();
            // resume after a period of inactivity
            setTimeout(() => {
                if (!document.hidden) startAuto();
            }, AUTO_DELAY * 2);
        }

        // Pause on hover / touch
        scroller.addEventListener('mouseenter', () => { stopAuto(); });
        scroller.addEventListener('mouseleave', () => { if (!document.hidden) startAuto(); });
        scroller.addEventListener('touchstart', () => { stopAuto(); }, { passive: true });
        scroller.addEventListener('touchend', () => { if (!document.hidden) startAuto(); });

        // Pause when page is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAuto();
            } else {
                startAuto();
            }
        });

        // Start auto-scroll
        startAuto();

        // Make buttons visible only when JavaScript is enabled — you may style via CSS later
        prev.style.opacity = '1';
        next.style.opacity = '1';
    })();

});