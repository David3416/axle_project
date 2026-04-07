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
    burgerItem.addEventListener('click', () => {
        console.log(1);
        menu.classList.add('header_nav_active')

    });
     menuCloseItem.addEventListener('click', () => {
        console.log(1);
        menu.classList.remove('header_nav_active');

    });

}());