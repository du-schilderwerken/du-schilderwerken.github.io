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

    // ==========================================================
    // Portfolio Auto Scroll Functie (NIEUW TOEGEVOEGD)
    // ==========================================================
    const portfolioContainer = document.getElementById('portfolio-scroll-container');

    if (portfolioContainer) {
        let scrollSpeed = 50;  // Scroll vertraging in milliseconden (lager = sneller)
        let scrollStep = 1;    // Scroll afstand in pixels per stap
        let scrollDirection = 1; // 1 = omlaag, -1 = omhoog
        let scrollInterval;

        const startAutoScroll = () => {
            // Voorkom dat er meerdere intervallen tegelijk lopen
            stopAutoScroll(); 

            scrollInterval = setInterval(() => {
                // Scroll de container
                portfolioContainer.scrollTop += scrollStep * scrollDirection;

                // Controleer of de onderkant is bereikt (met kleine marge)
                // We gebruiken scrollHeight - clientHeight om de maximale scrollafstand te bepalen
                if (portfolioContainer.scrollTop + portfolioContainer.clientHeight >= portfolioContainer.scrollHeight - scrollStep) {
                    // Verander de richting naar omhoog
                    scrollDirection = -1;
                }
                // Controleer of de bovenkant is bereikt
                else if (portfolioContainer.scrollTop <= scrollStep && scrollDirection === -1) {
                    // Verander de richting naar omlaag
                    scrollDirection = 1;
                }
            }, scrollSpeed);
        };

        const stopAutoScroll = () => {
            clearInterval(scrollInterval);
        };

        // Start de scroll bij het laden van de pagina
        startAutoScroll();

        // Pauzeer scroll bij mouse-hover (betere UX)
        portfolioContainer.addEventListener('mouseenter', stopAutoScroll);

        // Hervat scroll na mouse-hover
        portfolioContainer.addEventListener('mouseleave', startAutoScroll);
    }
    // ==========================================================
});