$(function() {
	let wheight = $(window).height(); //get the heoght of the window
	let wheight2 = Math.floor($(window).height() *  0.87); //get the heoght of the window

	$('.fullheight').css('height', wheight);
	$('.fullheight2').css('height', wheight2);
	$('#navigation').css('height', wheight);
	$('.main-login-container').css('height', wheight);

	//replace IMG insode carousel with a background image
	$('#featured .carousel-item img').each(function() {
		let imgSrc = $(this).attr('src');
		$(this).parent().css({'background-image': 'url('+imgSrc+')'});
		$(this).remove();
	});

	$(window).resize(function() {
		let wheight = $(window).height(); //get the heoght of the window
		let wheight2 = Math.floor($(window).height() *  0.87); //get the heoght of the window

		$('.fullheight').css('height', wheight);
		$('.fullheight2').css('height', wheight2);

	});

  $(window).scroll(function() { // check if scroll event happened
    if ($(document).scrollTop() > (wheight - 35)) { // check if user scrolled more than 50 from top of the browser window
      $(".navbar.navigationBar").css("background-color", "rgba(187, 171, 57, 0.9)"); // if yes, then change the color of class "navbar-fixed-top" to white (#f8f8f8)
      //$(".navbar-collapse.show").css("background-color", "none");
      //$(".navbar-collapse").removeClabass("show");
    } else {
      $(".navbar.navigationBar").css("background-color", "transparent"); // if not, change it back to transparentss
     // $(".navbar-collapse").addClass("show");
    }

    if ($(document).scrollTop() > (wheight2 - 35)) { // check if user scrolled more than 50 from top of the browser window
      $(".navbar.navigationBar2").css("background-color", "#F63A59"); // if yes, then change the color of class "navbar-fixed-top" to white (#f8f8f8)
    } else {
      $(".navbar.navigationBar2").css("background-color", "transparent"); // if not, change it back to transparent
    }
  });

  $(".navbar-nav").clone().prependTo("#off-canvas");
  $(document).trigger("enhance");



 //  let windowsize = $(window).width();

	// $(window).resize(function() {
	//   windowsize = $(window).width();

	//   if (windowsize <= 768) {
	// 	// $("nav .container .navbar-header + div").toggleClass("show");
	//   }else {
	//   	 //$(".navbar-collapse.show").css("background-color", "");
	//   }
	// });

});