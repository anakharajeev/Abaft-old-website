(function($) {
  'use strict';


  var videos = $('video');

  var resizeId;

  function whichTransitionEndEvent(){
    var t,
        el = document.createElement("fakeelement");

    var transitions = {
      "transition"      : "transitionend",
      "OTransition"     : "oTransitionEnd",
      "MozTransition"   : "transitionend",
      "WebkitTransition": "webkitTransitionEnd"
    }

    for (t in transitions){
      if (el.style[t] !== undefined){
        return transitions[t];
      }
    }
  }

  function whichAnimationEndEvent(){
    var t,
        el = document.createElement("fakeelement");

    var transitions = {
      "transition"      : "animationend",
      "OTransition"     : "oAnimationEnd",
      "MozTransition"   : "animationend",
      "WebkitTransition": "webkitAnimationEnd"
    }

    for (t in transitions){
      if (el.style[t] !== undefined){
        return transitions[t];
      }
    }
  }

  var transitionEndEvent = whichTransitionEndEvent();
  var animationEndEvent = whichAnimationEndEvent();


  function swiperInit() {
    var swiper = new Swiper('.swiper-container', {
      spaceBetween: 0,
      centeredSlides: true,
      autoplay: false,
      mousewheel: true,
      speed: 0,
      reverseDirection: true,
      effect:'fade',
      direction: 'vertical',
      hashNavigation: {
        replaceState: false
      },
      // history: {
      //   replaceState: true,
      // },
      on: {
        init: function() {

          var swiper = this;

          setTimeout(function() {
            swiper.$el.addClass('initd');
          }, 100);

        },
        slideChange: function() {

          if (this.activeIndex == 0) {
            this.$el.removeClass('greater-than-one');
          } else {
            this.$el.addClass('greater-than-one');
          }

          setTimeout(function() {
            // update the browser history state to work with smoothState.js
            if(window.history.state === null && window.smoothState) {
              // the 'main' is the id of the smoothState element
              var state = { id: 'main' };

              /** Update history entry */
              window.history.replaceState(state, document.title, window.location.href);
            }
          }, 100)

        },
        slideNextTransitionStart: function() {

          this.mousewheel.disable();
          $('#white-board').addClass('playact');
        },
        slideNextTransitionEnd: function() {

        },
        slidePrevTransitionStart: function() {

          this.mousewheel.disable();
          $('#white-board-reverse').addClass('playact');
        },
        slidePrevTransitionEnd: function() {

        }
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
        renderBullet: function(index, className) {
          return '<span class="' + className + '"><strong>' + $(this.slides[index]).data('title') + '</strong></span>';
        }
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        800: {

        }
      }


    });


    $('#white-board').on(animationEndEvent, function() {
      $(this).removeClass('playact');

      swiper.mousewheel.enable();
    });


    $('#white-board-reverse').on(animationEndEvent, function() {
      $(this).removeClass('playact');

      swiper.mousewheel.enable();
    });

    window.swiper = swiper;
  }

  swiperInit();

  var smoothStateOptions = {
    debug: true,
    // prefetch: true,
    // cacheLength: 2,
    onAfter: function($container, $newContent) {
      swiperInit();
    },
    onStart: {
      duration: 1000, // Duration of our animation
      render: function ($container) {
        // Add your CSS animation reversing class
        // $container.addClass('is-exiting');
        // Restart your animation
        $('#main').data('smoothState').restartCSSAnimations();
      }
    },
    onReady: {
      duration: 0,
      render: function ($container, $newContent) {
        // Remove your CSS animation reversing class
        // $container.removeClass('is-exiting');
        // Inject the new content
        $container.html($newContent);
      }
    }
  };

  if ( window.WOW ) {
    new WOW().init();
  }
  

})(jQuery);
