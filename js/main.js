(function($) {

  "use strict";

  /*
  |--------------------------------------------------------------------------
  | Template Name: MYSELF
  | Author: AWESOME THEMEZ
  | Version: 1.0.0
  |--------------------------------------------------------------------------
  |--------------------------------------------------------------------------
  | TABLE OF CONTENTS:
  |--------------------------------------------------------------------------
  |
  | 1. Scripts initialization
  | 2. Preloader
  | 3. Primary Menu
  | 4. Scroll Function
  | 5. Section Active and Scrolling Animation
  | 6. Scroll Up
  | 8. Smooth Scroll
  | 10. Portfolio
  | 11. Magnific Popup
  |
  */

  /*--------------------------------------------------------------
    1. Scripts initialization
  --------------------------------------------------------------*/

 	$(window).on('load', function() {
      	$(window).trigger("scroll");
      	$(window).trigger("resize");
      	preloaderSetup();
      	portfolioMsSetup();
  	});


	$(document).ready(function() {
	    $(window).trigger("resize");
	    primaryMenuSetup();
	    mobileMenu();
        scrollAnimation();
        sectionActive();
	    scrollUp();
	    smoothScrollSetup();
	    portfolioMsSetup();
	    magnificPopupSetup();
	    new WOW().init();
	    $('.parallax').parallax("50%", 0.3);
	});


  	$(window).on('resize', function() {
	    mobileMenu();
	    portfolioMsSetup();
  	});


	$(window).on('scroll', function() {
	    scrollFunction();
	});


  /*--------------------------------------------------------------
    2. Preloader
  --------------------------------------------------------------*/

  	function preloaderSetup() {

	    $("body").imagesLoaded(function () {
	      $(".preloader-wave").fadeOut();
	      $("#preloader").delay(200).fadeOut("slow").remove();
	    });

  	}


  /*--------------------------------------------------------------
    3. Primary Menu
  --------------------------------------------------------------*/
  
  	function primaryMenuSetup() {

	    $( ".primary-nav-list" ).before( "<div class='m-menu-btn'><span></span></div>" );

	    $(".m-menu-btn").on('click', function(){
	      $( this ).toggleClass( "m-menu-btn-ext" );
	      $(this).siblings('.primary-nav-list').slideToggle("slow");
	    });

        // Home Version-1
        $(".sp-menu-btn").on('click', function(){
          $( this ).toggleClass( "sp-m-menu-btn-ext" );
          $(this).siblings('.primary-nav-list').toggleClass( "ex" );
        }); //End

	    $( ".menu-item-has-children > ul" ).before( "<i class='fa fa-plus m-dropdown'></i>" );

	    $('.m-dropdown').on('click', function() {
	      $(this).siblings('ul').slideToggle("slow");
	      $(this).toggleClass("fa-plus fa-minus");
	    });

  	}


  	function mobileMenu() {

    	if ($(window).width() <= 983){  
      		$('.primary-nav').addClass('m-menu').removeClass('primary-nav');
    	} else {
      		$('.m-menu').addClass('primary-nav').removeClass('m-menu');
    	}

  	}


  /*--------------------------------------------------------------
    4. Scroll Function
  --------------------------------------------------------------*/

  function scrollFunction() {

    var scroll = $(window).scrollTop();

    if(scroll >= 10) {
        $(".site-header").addClass("small-height");
      } else {
          $(".site-header").removeClass("small-height");
      }

    // For Scroll Up
    if(scroll >= 350) {
        $(".scrollup").addClass("scrollup-show");
      } else {
          $(".scrollup").removeClass("scrollup-show");
      }

  }


  /*--------------------------------------------------------------
    5. Section Active and Scrolling Animation
  --------------------------------------------------------------*/

  function scrollAnimation() {

    $('a').bind('click', function(event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: ($($anchor.attr('href')).offset().top - 69)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

  }

  function sectionActive() {

    $('body').scrollspy({
      target: '.site-header',
      offset: 70
    });
  }


  /*--------------------------------------------------------------
    6. Scroll Up
  --------------------------------------------------------------*/

  	function scrollUp() {

    	$( "body" ).append( "<span class='scrollup'></span>" );

    	$('.scrollup').on('click', function(e) {
	      	e.preventDefault();
	      	$('html,body').animate({
	        	scrollTop: 0
	      	}, 1000);
    	});

  	}



  /*--------------------------------------------------------------
    8. Smooth Scroll
  --------------------------------------------------------------*/

  	function smoothScrollSetup() {

    	if (typeof smoothScroll == 'object') {
      		smoothScroll.init();
    	}

  	}


    /*--------------------------------------------------------------
    10. Portfolio
    --------------------------------------------------------------*/

    function portfolioMsSetup() {

        $('.portfolio').isotope({
          itemSelector: '.portfolio-item',
          transitionDuration: '0.60s',
          percentPosition: true,
          masonry: {
            columnWidth: '.grid-sizer'
          }
        });

        /* Active Class of Portfolio*/
        $('.portfolio-filter ul li').on('click', function(event) {
            $(this).siblings('.active').removeClass('active');
            $(this).addClass('active');
            event.preventDefault();
        });

        /*=== Portfolio filtering ===*/
        $('.portfolio-filter ul').on('click', 'a', function() {
            var filterElement = $(this).attr('data-filter');
            $(this).parents(".portfolio-filter").next().isotope({
                filter: filterElement
            });
        });

    }


  /*--------------------------------------------------------------
    11. Magnific Popup
  --------------------------------------------------------------*/

  	function magnificPopupSetup() {

	    $('.zoom-gallery').magnificPopup({
	        delegate: 'a',
	        type: 'image',
	        closeOnContentClick: false,
	        closeBtnInside: false,
	        mainClass: 'mfp-with-zoom mfp-img-mobile',
	        gallery: {
	            enabled: true
	        },
	        zoom: {
	            enabled: true,
	            duration: 300, // don't foget to change the duration also in CSS
	            opener: function(element) {
	                return element.find('img');
	            }
	        }
	        
	    });
	    
  	}


   
})(jQuery); // End of use strict


