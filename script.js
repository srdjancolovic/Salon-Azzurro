'use-strict';
const hamburger = document.querySelector('.hamburger');
const open = document.querySelector('.open');
const navigationLinksWrap = document.querySelector('.navigation-links-wrap');
const naviLinks = document.querySelectorAll('.navi-link');
const aboutSection = document.getElementById('about');
const navbar = document.querySelector('.navigation-bar');
const landingPage = document.querySelector('.landing-page');
const logo = document.getElementById('logo');
const topBtn = document.querySelector('.top-btn');

//Preloader hide on load
$(window).on('load', function () {
  $('.preloader').fadeOut();
  $('.wrapper').fadeOut();

  $(function () {
    // a self calling function
    function onScrollInit(items, trigger) {
      // a custom made function
      items.each(function () {
        //for every element in items run function
        var osElement = $(this), //set osElement to the current
          osAnimationClass = osElement.attr('data-animation'), //get value of attribute data-animation type
          osAnimationDelay = osElement.attr('data-delay'); //get value of attribute data-delay time

        osElement.css({
          //change css of element
          '-webkit-animation-delay': osAnimationDelay, //for safari browsers
          '-moz-animation-delay': osAnimationDelay, //for mozilla browsers
          'animation-delay': osAnimationDelay, //normal
        });

        var osTrigger = trigger ? trigger : osElement; //if trigger is present, set it to osTrigger. Else set osElement to osTrigger

        osTrigger.waypoint(
          function () {
            //scroll upwards and downwards
            osElement.addClass('animated').addClass(osAnimationClass); //add animated and the data-animation class to the element.
          },
          {
            triggerOnce: true, //only once this animation should happen
            offset: '70%', // animation should happen when the element is 70% below from the top of the browser window
          }
        );
      });
    }

    onScrollInit($('.os-animation')); //function call with only items
    onScrollInit(
      $('.staggered-animation'),
      $('.staggered-animation-container')
    ); //function call with items and trigger
  });

  //Navbar animations
  gsap.from('.logo', { duration: 0.5, opacity: 0, x: -100, delay: 0.5 });
  gsap.from('.navigation-links-wrap', {
    duration: 0.5,
    opacity: 0,
    x: 100,
    delay: 0.5,
  });

  gsap.from('.hamburger', {
    duration: 0.5,
    opacity: 0,
    x: 100,
    delay: 0.5,
  });
});

//Open/close menu for mobile
hamburger.addEventListener('click', function (e) {
  e.preventDefault();

  open.classList.toggle('close');

  navigationLinksWrap.classList.toggle('navigation-links-wrap-show');

  navbar.classList.toggle('navbar-color-on-click');

  hamburger.classList.toggle('hamburger-black-border');
});

//Toggle navigation links wrapeer
naviLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    open.classList.toggle('close');
    navigationLinksWrap.classList.toggle('navigation-links-wrap-show');
    navbar.classList.toggle('navbar-color-on-click');
  });
});

const addNavClass = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) {
    navbar.classList.add('navbar-background');

    topBtn.classList.add('show-top-btn');

    logo.src = 'img/logo-blue.png';

    hamburger.classList.add('hamburger-black-border');

    hamburger.addEventListener('click', function () {
      hamburger.classList.add('hamburger-black-border');
    });
  } else {
    navbar.classList.remove('navbar-background');

    topBtn.classList.remove('show-top-btn');

    logo.src = 'img/logo.png';

    hamburger.classList.remove('hamburger-black-border');

    naviLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (link.id === 'landing-link') {
          hamburger.classList.remove('hamburger-black-border');
        }
      });
    });
  }
};

const navObserver = new IntersectionObserver(addNavClass, {
  root: null,
  threshold: 0.5,
});

navObserver.observe(landingPage);

//Animations
const callback = function (entries, observer) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      console.log(entry.target);
      entry.target.timeline.play();
    }
  });
};

const observer = new IntersectionObserver(callback, {
  root: null,
  threshold: 0.15,
});

//SlideInUp Animation

const slideInUpAnim = document.querySelectorAll('.slideInUp');
slideInUpAnim.forEach(function (item) {
  const action = gsap
    .timeline({ paused: true })
    .from(item, { y: 20, opacity: 0, duration: 0.4, delay: 0.4 });

  item.timeline = action;
});

Array.prototype.forEach.call(slideInUpAnim, (el) => {
  observer.observe(el);
});

//SlideInLeft Animation
const slideInLeftAnim = document.querySelectorAll('.slideInLeft');
slideInLeftAnim.forEach(function (item) {
  const action = gsap
    .timeline({ paused: true })
    .from(item, { x: -20, opacity: 0, duration: 0.4, delay: 0.5 });
  item.timeline = action;
});
Array.prototype.forEach.call(slideInLeftAnim, (el) => {
  observer.observe(el);
});

//SlideInRight animation
const slideInRightAnim = document.querySelectorAll('.slideInRight');
slideInRightAnim.forEach(function (item) {
  const action = gsap
    .timeline({ paused: true })
    .from(item, { x: 20, opacity: 0, duration: 0.4, delay: 0.5 });
  item.timeline = action;
});
Array.prototype.forEach.call(slideInRightAnim, (el) => {
  observer.observe(el);
});

//Smooth scroll
$('.navi-link, #logo-smooth, .top-btn-icon').on('click', function (e) {
  if (this.hash !== '') {
    const hash = this.hash;

    $('html, body').animate(
      {
        scrollTop: $(hash).offset().top,
      },
      800
    );
  }
});
//OWL CAROUSEL
$(document).ready(function () {
  //when document(DOM) loads completely
  $('#brand-carousel').owlCarousel({
    //owlCarousel settings
    autoplay: true, //set to false to turn off autoplay and only use nav
    autoplayHoverPause: true, //set to false to prevent pausing on hover
    loop: true, //set to false to stop carousel after all slides shown
    autoplayTimeout: 3000, //time between transitions
    smartSpeed: 1200, //transition speed
    nav: false,
    responsive: {
      //set number of items shown per screen width
      0: {
        dotsEach: 5,
        items: 1, //0px width and up display 1 item
      },
      768: {
        dotsEach: 5,
        items: 2, //768px width and up display 2 items
      },
      992: {
        dotsEach: 5,
        items: 3, //992px width and up display 3 items
      },
    },
  });
});

$(document).ready(function () {
  //when document(DOM) loads completely
  $('.offer-carousel').owlCarousel({
    //owlCarousel settings
    autoplay: true, //set to false to turn off autoplay and only use nav
    autoplayHoverPause: true, //set to false to prevent pausing on hover
    loop: true, //set to false to stop carousel after all slides shown
    autoplayTimeout: 4200, //time between transitions
    smartSpeed: 1200, //transition speed
    dotsSpeed: 1000, //transition speed when using dots/buttons
    responsive: {
      //set number of items shown per screen width
      0: {
        dotsEach: 2,
        items: 1, //0px width and up display 1 item
      },
      768: {
        items: 2, //768px width and up display 2 items
      },
      992: {
        items: 2, //992px width and up display 3 items
      },
      1200: {
        dotsEach: 2,
        items: 3, //992px width and up display 3 items
      },
    },
  });
});

// var swiper = new Swiper('.bathrooms-swiper', {
//   slidesPerView: 3,
//   spaceBetween: 30,
//   pagination: {
//     el: '.swiper-pagination',
//     clickable: true,
//     type: 'fraction',
//   },
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },
// });
const sliderFn = (sliderName, paginationName, nextBtn, prevBtn, slPerView) => {
  const swiper = new Swiper(sliderName, {
    loop: true,
    breakpoints: {
      1921: {
        spaceBetween: 100,
        slidesPerView: slPerView,
      },
      1200: {
        spaceBetween: 30,

        slidesPerView: slPerView,
      },
      640: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
    },
    pagination: {
      el: paginationName,
      clickable: true,
    },
    navigation: {
      nextEl: nextBtn,
      prevEl: prevBtn,
    },
  });
  return swiper;
};

sliderFn(
  '.bathrooms-swiper',
  '.bathrooms-pagination',
  '.bathroom-next-btn',
  '.bathroom-prev-btn',
  3
);
sliderFn(
  '.tiles-swiper',
  '.tiles-pagination',
  '.tiles-next-btn',
  '.tiles-prev-btn',
  3
);
sliderFn(
  '.wood-floor-swiper',
  '.wood-floor-pagination',
  '.wood-floor-next-btn',
  '.wood-floor-prev-btn',
  3
);
sliderFn(
  '.fasada-swiper',
  '.fasada-pagination',
  '.fasada-next-btn',
  '.fasada-prev-btn',
  3
);
sliderFn(
  '.ostala-ponuda-swiper',
  '.ostala-ponuda-pagination',
  '.ostala-ponuda-next-btn',
  '.ostala-ponuda-prev-btn',
  3
);