'use strict';

(function () {
    var mainMenu = document.querySelector('.main-menu');
    var toggle = document.querySelector('.main-menu__toggle');
    mainMenu.classList.remove('main-menu--nojs');
    mainMenu.classList.remove('main-menu--opened');
    mainMenu.classList.add('main-menu--closed');
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
    var yandexMap = document.querySelector('.contacts__yandex-map');
    var staticMap = document.querySelector('.contacts__static-map');
    yandexMap.classList.remove('contacts__yandex-map--nojs');
    staticMap.style.display = 'none';
    ymaps.ready(init);
    function init(){
      var myMap = new ymaps.Map('map', {
        center: [59.938655, 30.321832],
        zoom: 16
      }),
      myPlacemark = new ymaps.Placemark([59.938631, 30.323055], {
        hintContent: 'Cat Energy',
        balloonContent: false
      }, {
        iconLayout: 'default#image',
        iconImageHref: 'img/map-pin.png',
        iconImageSize: [62, 53],
        iconImageOffset: [-31, -53]
      });
      myMap.geoObjects
        .add(myPlacemark)
    }
    var PIN_WIDTH = 33;
    var IMAGE_MIN_WIDTH = 131;
    var exampleWrapperDesc = document.querySelector('.example__container');
    var exampleWrapperTab = document.querySelector('.example__demo');
    var beforeBtn = exampleWrapperTab.querySelector('.example__button--before');
    var afterBtn = exampleWrapperTab.querySelector('.example__button--after');
    var beforeImg = exampleWrapperTab.querySelector('.example__image-wrapper--before');
    var pin = exampleWrapperTab.querySelector('.example__pin');
    var line = exampleWrapperTab.querySelector('.example__line');
    beforeBtn.addEventListener('click', function () {
      beforeImg.classList.remove('example__image-wrapper--disappearance');
      beforeImg.classList.add('example__image-wrapper--appearance');
      pin.style.left = '';
      pin.classList.remove('example__pin--after');
      pin.classList.add("example__pin--before");
      beforeImg.style.width = '100%';
    });
    afterBtn.addEventListener('click', function () {
      beforeImg.classList.remove('example__image-wrapper--appearance');
      beforeImg.classList.add('example__image-wrapper--disappearance');
      pin.style.left = '';
      pin.classList.remove('example__pin--before');
      pin.classList.add("example__pin--after");
      beforeImg.style.width = '0';
    });
    var isCursorOnLeft = function (cursorPosition, min) {
      return (cursorPosition < min);
    };
    var isCursorOnRight = function (cursorPosition, max) {
      return (cursorPosition > max);
    };
    var getValueInLimit = function (position, value, min, max) {
      if (value < min || isCursorOnLeft(position, line.getBoundingClientRect().left)) {
        return min;
      }
      if (value > max || isCursorOnRight(position, line.getBoundingClientRect().right)) {
        return max;
      }
      return value;
    };
    var setCoord = function (position, shift) {
      return getValueInLimit(position, pin.offsetLeft - shift, PIN_WIDTH/2, line.offsetWidth - PIN_WIDTH/2);
    };
    var setBackground = function (elem, position) {
      elem.style.backgroundImage = "linear-gradient(to right, #f2f2f2 " + position + "px, #eaeaea " + position + "px)"

    };
    pin.addEventListener('touchstart', function (evt) {
      var startCoordX = evt.changedTouches[0].clientX;
      var onMouseMove = function (moveEvt) {
        if (
          !isCursorOnLeft(moveEvt.changedTouches[0].clientX, line.getBoundingClientRect().left)
          || !isCursorOnRight(moveEvt.changedTouches[0].clientX, line.getBoundingClientRect().right)
        ) {
          var shift = startCoordX - moveEvt.changedTouches[0].clientX;
          startCoordX = moveEvt.changedTouches[0].clientX;
          var newCoord = setCoord(moveEvt.changedTouches[0].clientX, shift);
          pin.style.left = newCoord + 'px';
          beforeImg.style.width = (IMAGE_MIN_WIDTH + newCoord) + 'px';
          setBackground(exampleWrapperTab, pin.getBoundingClientRect().left + PIN_WIDTH/2);
        }
      };
      var onMouseUp = function () {
        document.removeEventListener('touchmove', onMouseMove);
        document.removeEventListener('touchend', onMouseUp);
      };
      document.addEventListener('touchmove', onMouseMove);
      document.addEventListener('touchend', onMouseUp);
    });
    pin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var startCoordX = evt.clientX;
      var onMouseMove = function (moveEvt) {
        if (
          !isCursorOnLeft(moveEvt.clientX, line.getBoundingClientRect().left)
          || !isCursorOnRight(moveEvt.clientX, line.getBoundingClientRect().right)
        ) {
          moveEvt.preventDefault();
          var shift = startCoordX - moveEvt.clientX;
          startCoordX = moveEvt.clientX;
          var newCoord = setCoord(moveEvt.clientX, shift);
          pin.style.left = newCoord + 'px';
          beforeImg.style.width = (IMAGE_MIN_WIDTH + newCoord) + 'px';
          setBackground(exampleWrapperDesc, pin.getBoundingClientRect().left + PIN_WIDTH/2);
        }
      };
      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
}
)();
