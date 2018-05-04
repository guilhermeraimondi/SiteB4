$(document).ready(function(){
      $(".navbar-mobile__btn-close, .mask, .menu-toggle").click(function(){
        $(".navbar-mobile").toggleClass("shown");
        $(".mask").toggle();
      });
      // $(".navbar-mobile__nav__item__link").click(function(event){
      //   event.preventDefault();
      //   $('html,body').animate({
      //     scrollTop:$(this.hash).offset().top}, 1000);
      // });

      $('.owl1').owlCarousel({
        responsive:{
          items:1,
          0:{
              items:2
          },
          600:{
              items:4
          },
          1000:{
              items:6
          }
        },
        margin: 20,
        loop:true,
        // nav:true,
        center: true,
        // autoplay:true,
        // fluidSpeed: true,
        // autoplayHoverPause:true,
        autoHeight: false
      });


      var owl2 = $('.owl2').owlCarousel({
         responsive:{
          0:{
              items:2
          },
          600:{
              items:3
          }
        },
        margin: 10,
        loop:false,
        autoHeight: true
      });
      owl = $("#owl2").data('owlCarousel');
      owl.jumpTo(2);
});

        
      /*$(document).on("click", function(e){
        if($(e.toElement).hasClass("navbar-mobile") ||
              $(e.toElement).hasClass("menu-toggle") ||
              $(e.toElement).parents().hasClass("menu-toggle") ||
              $(e.toElement).parents().hasClass("navbar-mobile"))
          return;

        $(".navbar-mobile").removeClass("shown");
        $(".mask").hide();
      });*/



    //   $('.owl-carousel').owlCarousel({
    //       loop:true,
    //       center:true,
    //       margin:10,
    //       nav:true,
          
    //   })
    // });
    // 