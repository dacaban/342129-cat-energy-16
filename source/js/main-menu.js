'use strict';

(function () {
    var mainMenu = document.querySelector('.main-menu');
    var toggle = document.querySelector('.main-menu__toggle');

    mainMenu.classList.remove('main-menu--nojs');

    function toggleMenu() {
      if (mainMenu.classList.contains('main-menu--closed')) {
        mainMenu.classList.remove('main-menu--closed');
        mainMenu.classList.add('main-menu--opened');
      } else {
        mainMenu.classList.add('main-menu--closed');
        mainMenu.classList.remove('main-menu--opened');
      }
    }

    toggle.addEventListener('click', toggleMenu);
}
)();
