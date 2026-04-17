(function () {
    const header = document.querySelector('.header');
    window.onscroll = () => {
        if (window.pageYOffset > 56) {
            header.classList.add('header_active');
        } else {
            header.classList.remove('header_active');
        }
    }
}());


//---------------- Burger handler----------------
(function () {
    const burgerItem = document.querySelector('.burger');
    const menu = document.querySelector('.header_nav');
    const menuCloseItem = document.querySelector('.header_nav_close');

    if (burgerItem && menu && menuCloseItem) {
        burgerItem.addEventListener('click', () => {
            menu.classList.add('header_nav_active');
        });

        menuCloseItem.addEventListener('click', () => {
            menu.classList.remove('header_nav_active');
        });
    }
})();

(function () {

    const smoothScroll = function (targetEl, duration) {
        const headerElHeight = document.querySelector('.header').clientHeight;
        let target = document.querySelector(targetEl);
        let targetPosition = target.getBoundingClientRect().top - headerElHeight;
        let startPosition = window.pageYOffset;
        let startTime = null;

        const ease = function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        const animation = function (currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);

    };

    const scrollTo = function () {
        const links = document.querySelectorAll('.js-scroll');
        links.forEach(each => {
            each.addEventListener('click', function () {
                const currentTarget = this.getAttribute('href');
                smoothScroll(currentTarget, 1000);
            });
        });
    };
    scrollTo();
}());


function openTab(index) {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.content');

    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));

    tabs[index].classList.add('active');
    contents[index].classList.add('active');
}









function showUserUI() {
    const loginLink = document.querySelector('#loginLink');
    const userMenu = document.querySelector('#userMenu');

    if (loginLink) loginLink.style.display = 'none';
    if (userMenu) userMenu.style.display = 'block';
}

function showGuestUI() {
    const loginLink = document.querySelector('#loginLink');
    const userMenu = document.querySelector('#userMenu');

    if (loginLink) loginLink.style.display = 'block';
    if (userMenu) userMenu.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    if (token) {
        showUserUI();
    } else {
        showGuestUI();
    }

    const userName = document.getElementById('userName');

    if (userName) {
        userName.addEventListener('click', () => {
            const dropdown = document.getElementById('dropdown');

            dropdown.style.display =
                dropdown.style.display === 'none' ? 'block' : 'none';
        });
    }

    const logoutBtn = document.getElementById('logoutBtn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('token');
            window.location.href = '/';
        });
    }
});