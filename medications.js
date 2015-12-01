document.addEventListener("DOMContentLoaded", function() {

	$('#add-medication').on('click', function(e) {
		e.preventDefault();
		$('#scan-overlay').show();
	});

	$('#view-medications').on('click', function(e) {
		e.preventDefault();
		$('#view-medications-overlay').show();
	});

	$('.scan-btn').on('click', function(e) {
		e.preventDefault();
		$('#scan-overlay').hide();
		$('#pour-overlay').show();
	});

	$('.done-btn').on('click', function(e) {
		e.preventDefault();
		$('.overlay').hide();
	});

	$('.instructions-container').on('click', function(e) {
		e.preventDefault();
		$('.overlay').hide();
	});
	

});