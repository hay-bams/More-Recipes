$(function() {
	let wheight = $(window).height(); //get the heoght of the window
	let wheight2 = Math.floor($(window).height() *  0.87); //get the heoght of the window

	$('.fullheight').css('height', wheight);
	$('.fullheight2').css('height', wheight2);
	$('#navigation').css('height', wheight);

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
		// $('.overlay').css('height', wheight);

	});


  $(".navbar-nav").clone().prependTo("#off-canvas");
	$(document).trigger("enhance");
	
	toastr.options = {
		"closeButton": true,
		"debug": false,
		"newestOnTop": false,
		"progressBar": false,
		"positionClass": "toast-bottom-left",
		"preventDuplicates": false,
		"onclick": null,
		"showDuration": "300",
		"hideDuration": "1000",
		"timeOut": "5000",
		"extendedTimeOut": "1000",
		"showEasing": "swing",
		"hideEasing": "linear",
		"showMethod": "fadeIn",
		"hideMethod": "fadeOut"
	}

});