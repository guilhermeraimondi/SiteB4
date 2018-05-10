// function easeIn(t) {
//   return t * t * t;
// }
// function easeOut(t) {
//   return 1 - (1-t) * (1-t) * (1-t);
// }
// function easeInOut(t) {
//   if(t <= 0.5) {
//     return easeIn(t*2)/2;
//   }else{
//     return easeOut( (t - 0.5)*2 ) / 2 + 0.5;
//   }
// }
// var isPageLoaded = false;
// $(function(){
//   (function(){
//     var SIZE = 40,
//         MARGIN = 20,
//         SPEED = 220;

//     var canvas = document.getElementById("loader"),
//         ctx = canvas.getContext("2d");

//     var isGoingRight = true,
//         step = 0,
//         lastId = 1,
//         lastMove = Date.now();

//     function Square(x, y) {
//       this.id = lastId++;
//       this.prevX = x;
//       this.prevY = y;
//       this.nextX = x;
//       this.nextY = y;
//       this.x = x;
//       this.y = y;
//       this.animation = 0;

//       Square.squares.push(this);
//     }
//     Square.squares = [];
//     Square.prototype.animate = function() {
//       //this.animation = Math.min(this.animation + 0.05, 1);
//       this.animation = (Date.now() - lastMove) / SPEED;
//       var t = easeInOut(this.animation);

//       this.x = this.prevX + (this.nextX - this.prevX) * t;
//       this.y = this.prevY + (this.nextY - this.prevY) * t;

//       return this;
//     };
//     Square.prototype.draw = function(_ctx) {
//       var x = (canvas.width / 2) + (MARGIN / 2) +(SIZE*this.x) - (SIZE*2);
//       var y = (canvas.height / 2) + (MARGIN / 2) + (SIZE*this.y) - (SIZE*2);
//       _ctx.clearRect(x, y, SIZE - (MARGIN / 2), SIZE - (MARGIN / 2));
//     };

//     new Square(0, 1);
//     new Square(1, 1);
//     new Square(2, 1);
//     new Square(3, 1);

//     new Square(0, 0);
//     function loop() {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;

//       ctx.fillStyle = "#232323";
//       ctx.fillRect(0, 0, canvas.width, canvas.height);
//       for(var i = 0; i < Square.squares.length; i++)
//         Square.squares[i].animate().draw(ctx);
    
//       $("#loader").css("background-color", "transparent");
//       if(!isPageLoaded)
//         requestAnimationFrame(loop);
//     }
//     requestAnimationFrame(loop);

//     setInterval(function(){
//       lastMove = Date.now();
//       for(var i = 0; i < Square.squares.length; i++){
//         var target = Square.squares[i];
//         target.animation = 0;
//         target.x = target.nextX;
//         target.y = target.nextY;

//         target.prevX = target.nextX;
//         target.prevY = target.nextY;
//       }
//       switch(step) {
//         case 0:
//           var target = null;

//           for(var i = 0; i < Square.squares.length; i++)
//             if(Square.squares[i].nextY == 0)
//               target = Square.squares[i];

//           target.nextY += 1;

//           for(var i = 0; i < Square.squares.length; i++){
//             if(Square.squares[i].nextX == target.nextX &&
//                 Square.squares[i].nextY == target.nextY && Square.squares[i].id != target.id){
//               target = Square.squares[i];
//               break;
//             }
//           }

//           target.nextY += 1;
//           if(!isGoingRight && target.nextX == 0)
//             isGoingRight = true;
//         break;

//         case 1:
//           var target = null;

//           for(var i = 0; i < Square.squares.length; i++)
//             if(Square.squares[i].nextY == 2)
//               target = Square.squares[i];

//           target.nextX += isGoingRight ? 1 : -1;
//         break;

//         case 2:
//           var target = null;

//           for(var i = 0; i < Square.squares.length; i++)
//             if(Square.squares[i].nextY == 2)
//               target = Square.squares[i];

//           target.nextY -= 1;

//           for(var i = 0; i < Square.squares.length; i++){
//             if(Square.squares[i].nextX == target.nextX &&
//                 Square.squares[i].nextY == target.nextY && Square.squares[i].id != target.id){
//               target = Square.squares[i];
//               break;
//             }
//           }

//           if(target.nextX == 3)
//             isGoingRight = false;
//           target.nextY -= 1;
//         break;

//         case 3:
//           var target = null;

//           for(var i = 0; i < Square.squares.length; i++)
//             if(Square.squares[i].nextY == 0)
//               target = Square.squares[i];

//           target.nextX += isGoingRight ? 1 : -1;
//         break;
//       }
//       step = (step + 1) % 4;
//     }, SPEED);
//   })();

  // Canvas
  (function(){
    var canvasEl = document.getElementById('confete');

    var w = canvasEl.width = $(".hero").outerWidth(),
        h = canvasEl.height = $(".hero").outerHeight();
    function loop() {
      w = canvasEl.width = $(".hero").outerWidth();
      h = canvasEl.height = $(".hero").outerHeight();

      ctx.clearRect(0,0,w,h);
      
      confs.forEach(function (conf){
        conf.update();
        conf.draw();
      });
      requestAnimationFrame(loop);
    }

    function Confetti () {
      //varruct confetti
      var colours = ['#fde132', '#009bde', '#ff6b00'];
      
      this.x = Math.round(Math.random(10) * w);
      this.y = Math.round(Math.random(10) * h)-(h/2);
      this.rotation = Math.random(10)*360;

      var size = Math.random(10)*(w/60);
      this.size = size < 15 ? 15 : size;

      this.color = colours[Math.round(Math.random(colours.length)*10-1)]

      this.speed = this.size/7;
      
      this.opacity = Math.random(10);

      this.shiftDirection = Math.random(10) > 0.5 ? 1 : -1;
    }

    Confetti.prototype.border = function() {
      if (this.y >= h) {
        this.y = h;
      }
    }

    Confetti.prototype.update = function() {
      this.y += this.speed;
      
      if (this.y <= h) {
        this.x += this.shiftDirection/5;
        this.rotation += this.shiftDirection*this.speed/100;
      }

      this.border();
    };

    Confetti.prototype.draw = function() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, this.rotation, this.rotation+(Math.PI/2));
      ctx.lineTo(this.x, this.y);
      ctx.closePath();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.fill();
    };

    var ctx = canvasEl.getContext('2d');
    var confNum = Math.floor(w / 5);
    //var confs = new Array(confNum).fill().map(_ => new Confetti());
    var confs = [];
    for(var i = 0; i < confNum; i++)
      confs.push(new Confetti());
    window.onload = function() {
      setTimeout(function(){
        requestAnimationFrame(loop);
      }, 0);
    };
  })();
// });

// Toggle navbar
$(document).ready(function(){
      $(".navbar-mobile__btn-close, .mask, .menu-toggle, .btn-outline-ligther, .navbar-mobile__nav__item__link").click(function(){
        $(".navbar-mobile").toggleClass("shown");
        $(".mask").toggle();
      });

  /*var lastScroll = 0;
  $(window).scroll(function(){
    var currentScroll = $(this).scrollTop();
    var homeHeight = $(".showcase").innerHeight();

    if(currentScroll < lastScroll){
      // scroll pra cima
      $(".menu-toggle").addClass("shown");
      console.log("mostrar");
      $(".back2top").addClass("shown");
    } else{
      $(".menu-toggle").removeClass("shown");
      console.log("esconder");
      $(".back2top").removeClass("shown");
    }
    lastScroll = currentScroll;
    if(currentScroll < homeHeight - $(".back2top").position().top){
      $(".back2top").removeClass("shown");
    }

  });*/
  var lastScroll = 0;
  $(window).scroll(function(){
    var currentScroll = $(this).scrollTop();
    var distMenuTopo = $(".menu-toggle").offset().top;
    var homeHeight = $(".hero").innerHeight();
    var isGoingUp = true;
    var limit = homeHeight - $(".back2top").position().top;
    if(currentScroll > lastScroll)
      isGoingUp = false;

    if(isGoingUp && currentScroll > limit + 20 && currentScroll >= 0){
      $(".back2top").addClass("shown");
    }
    if((!isGoingUp || currentScroll < limit - 20) && currentScroll >= 0){
      $(".back2top").removeClass("shown");
    }
    // if(currentScroll < limit - 20)){
    //   $(".menu-toggle").css("top", "20px");
    // }


    if(isGoingUp)
      $(".menu-toggle").addClass("shown");
    else
      $(".menu-toggle").removeClass("shown");

    lastScroll = currentScroll;

    if(distMenuTopo > (homeHeight * 0.6 - 23)){
      $(".menu-toggle").addClass("menu-no-meio");
    } else{
      $(".menu-toggle").removeClass("menu-no-meio");
    }
  });
      
      // $(".navbar-mobile__nav__item__link").click(function(event){
      //   event.preventDefault();
      //   $('html,body').animate({
      //     scrollTop:$(this.hash).offset().top}, 1000);
      // });
      var owl1 = $(".owl1");
      owl1.owlCarousel({
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

      $('.owl2').owlCarousel({
        items:1,
        loop:true,
        dots:false,
        nav:true,
        // nav:true,
        // center: true,
        // autoplay:true,
        fluidSpeed: true,
        autoplayHoverPause:true,
        autoHeight: false
      });
      // owl1.on('mousewheel', '.owl-stage', function (e) {
      //   if (e.deltaY>0) {
      //     owl1.trigger('next.owl');
      //   } else {
      //     owl1.trigger('prev.owl');
      //   }
      //   e.preventDefault();
      // });

      var owl2 = $('.owl3').owlCarousel({
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
});


// Ease Scroll
$(".navbar-mobile__nav__item__link, .arrow-link, .back2top-link").click(function(e){
  e.preventDefault(); //nao usar o 'teleporte' padrao do html
  var id = $(this).attr('href'), // attr puxa o atributo q vc quer
      targetOffset = $(id).offset().top; // pegar distancia do topo
      console.log(id, targetOffset);
  $('html, body').animate({
    scrollTop: targetOffset //animar o scrolltop para o local da div
  }, 700);
});

// Debounce do Lodash: evita que a func seja chamada varias vezes a cada pequeno scroll
debounce = function(func, wait, immediate){
  var timeout;
  return function(){
    var context = this, args = arguments;
    var later = function(){
      timeout = null;
      if(!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if(callNow) func.apply(context, args);
  };
};

// Anime div when scrolling
(function(){ // evitar conflito tornando variaveis locais, apenas para essa funcao 
  var $target = $('.animate-top, .animate-right'), //seleciona as classes que quer animar
      animationClass = 'animate-start',
      offset = $(window).height() * 4/5; // nunca deixar mais do que 3/4 da janela em branco
  function animateScroll(){
    var distDocumentTop = $(document).scrollTop(); 
    $target.each(function(){
      var distItemTop = $(this).offset().top;
      if(distDocumentTop > distItemTop - offset){
        $(this).addClass(animationClass);
      } else{
        $(this).removeClass(animationClass);
      }
    });
  }
  animateScroll(); 
  // mantem essa ativacao inical pois quando vc entra no site pela primeira
  // vez vc n da scroll e quando ja tem um item na tela que possa ser animado ele o sera

  $(document).scroll(debounce(function(){
    animateScroll();
  }, 50));
}());






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