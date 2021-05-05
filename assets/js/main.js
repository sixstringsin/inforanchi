/**
* Template Name: Green - v2.3.1
* Template URL: https://bootstrapmade.com/green-free-one-page-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
/*Custom Javascript*/
  /*hide twitter scrollbar
  window.onload = function() {
    let frameElement = document.getElementById("twitter-widget-0");
    console.log('frame'+frameElement);
    let doctwitter = frameElement.contentDocument;
    console.log('frame1'+doctwitter);
    doctwitter.body.innerHTML = doctwitter.body.innerHTML + '<style>.timeline-Viewport{overflow:hidden}</style>';
  }*/

/*Show Disclaimer*/
function modaloff(){
	$('#dynamicModal').off('shown.bs.modal');
}
function redirectExternal(url){
 window.open(url, '_blank');
}
function showModal(context,name,url) {
  var myModal = getModal();
  // Init the modal if it hasn't been already.
  if (!myModal) { myModal = initModal(); }
  
  var modalHtml;
  if(context=='siteleavingpopup'){
      modalHtml='<div class="modal-body">'+
        'You are leaving inforanchi.in to an external website hosted by <strong>'+name+'</strong>. Contents of this site are not owned by inforanchi.in'+
        '<br><br>Click continue if you are not automatically redirected.'+
      '</div>'+
      '<div class="modal-footer">'+
        '<button type="button" class="btn btn-secondary" data-dismiss="modal" onClick="modalOff();redirectExternal('+url+');">Continue</button>'+
      '</div>';
  }else{
	modalHtml='<div class="modal-body">'+
        'inforanchi.in is a not for profit initiative by a group of Ranchi residents. We are not paid by anyone and not affiliated to Govt or any NGO. Information on this website is collected from twitter, facebook, whatsapp etc. and local knowledge. Please verify the information before availing the service.'+
        'We also use cookies to serve better content to you.'+
	'<br><br>We kindly request you to accept these terms to use this website.'+
      '</div>'+
      '<div class="modal-footer">'+
        '<button type="button" class="btn btn-secondary" data-dismiss="modal">I Agree</button>'+
      '</div>';
  }
  setModalContent(modalHtml);
  // Show the modal.
  jQuery(myModal).modal({backdrop: 'static', keyboard: true, show: true});
	console.log(context);
  if(context=='siteleavingpopup'){
	  console.log(context);
    $(myModal).one('shown.bs.modal', function (e) {
	console.log('modal shown')
	setTimeout(function(){$(myModal).modal("hide");},5000);
        setTimeout(redirectExternal,5000,url);
    })
  }
}
function getModal() {
  return document.getElementById('dynamicModal');
}
function setModalContent(html) {
  getModal().querySelector('.modal-content').innerHTML ='';
  getModal().querySelector('.modal-content').innerHTML = html;
}
function initModal() {
  var modal = document.createElement('div');
  modal.classList.add('modal', 'fade');
  modal.setAttribute('id', 'dynamicModal');
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-labelledby', 'exampleModalCenterTitle');
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML =
        '<div class="modal-dialog modal-dialog-centered" role="document">' +
    	'<div class="modal-content">';
  document.body.appendChild(modal);
  return modal;
}
	$(document).ready(function () {
    //if cookie hasn't been set...
    if (document.cookie.indexOf("ModalShownTest=true")<0) {
        //$("#myModal").modal("show");
	    showModal('disclaimer');
     /* $("#myModal").modal({
                        backdrop: 'static',
                        keyboard: true, 
                        show: true
                });*/
        //Modal has been shown, now set a cookie so it never comes back
        $("#myModalClose").click(function () {
            $("#myModal").modal("hide");
        });
        document.cookie = "ModalShownTest=true";
    }
});
/*End Custom Javascript*/

!(function($) {
  "use strict";

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $('#header').outerHeight() - 1;
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, #mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
      $('#topbar').addClass('topbar-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
      $('#topbar').removeClass('topbar-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
    $('#topbar').addClass('topbar-scrolled');
  }

  // Intro carousel
  var heroCarousel = $("#heroCarousel");
  var heroCarouselIndicators = $("#hero-carousel-indicators");
  heroCarousel.find(".carousel-inner").children(".carousel-item").each(function(index) {
    (index === 0) ?
    heroCarouselIndicators.append("<li data-target='#heroCarousel' data-slide-to='" + index + "' class='active'></li>"):
      heroCarouselIndicators.append("<li data-target='#heroCarousel' data-slide-to='" + index + "'></li>");
  });

  heroCarousel.on('slid.bs.carousel', function(e) {
    $(this).find('h2').addClass('animate__animated animate__fadeInDown');
    $(this).find('p, .btn-get-started').addClass('animate__animated animate__fadeInUp');
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Clients carousel (uses the Owl Carousel library)
  if($(".clients-carousel") && $(".clients-carousel").length>0){
    $(".clients-carousel").owlCarousel({
      autoplay: true,
      dots: true,
      loop: true,
      responsive: {
        0: {
          items: 2
        },
        768: {
          items: 4
        },
        900: {
          items: 6
        }
      }
    });
  }
  // Porfolio isotope and filter
  $(window).on('load', function() {
    if($(".portfolio-container") && $(".portfolio-container").length>0){
      var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item'
      });

      $('#portfolio-flters li').on('click', function() {
        $("#portfolio-flters li").removeClass('filter-active');
        $(this).addClass('filter-active');

        portfolioIsotope.isotope({
          filter: $(this).data('filter')
        });
    });
  
    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function() {
    if($(".venobox") && $(".venobox").length>0){
      $('.venobox').venobox();
    }
    });
    }
  });

  // Portfolio details carousel
  if($(".portfolio-details-carousel") && $(".portfolio-details-carousel").length>0){
    $(".portfolio-details-carousel").owlCarousel({
      autoplay: true,
      dots: true,
      loop: true,
      items: 1
    });
  }

})(jQuery);
