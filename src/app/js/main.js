(function() {
    function displayPageLoadTime() {
        const pageLoadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
        const header = document.querySelector('.header');
        const loadTimeInfo = document.createElement('div');
        loadTimeInfo.classList.add('header__load-time');
        loadTimeInfo.textContent = `Время загрузки страницы: ${pageLoadTime} мс`;
        header.appendChild(loadTimeInfo);
    }

    function addMenuHoverEffect() {
        const menuItems = document.querySelectorAll('.header__item');
        menuItems.forEach(function(item) {
            item.addEventListener('mouseover', function() {
                item.style.backgroundColor = '#555';
            });
            item.addEventListener('mouseout', function() {
                item.style.backgroundColor = '';
            });
        });
    }

    function highlightActiveMenuItem() {
        const currentPage = window.location.pathname;
        const menuItems = document.querySelectorAll('.header__item a');

        menuItems.forEach(function(link) {
            const linkHref = link.getAttribute('href');

            if (currentPage.endsWith(linkHref) || (currentPage.endsWith('/') && linkHref.endsWith('index.html'))) {
                link.parentElement.classList.add('header__item--active');
            }
        });
    }

    window.addEventListener('load', function() {
        displayPageLoadTime();
        addMenuHoverEffect();
        highlightActiveMenuItem();
    });

})();
