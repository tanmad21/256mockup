document.addEventListener("DOMContentLoaded", function() {

	$('#add-medication').on('click', function(e) {
		e.preventDefault();
		$('#add-medication-overlay').show();
	});

	$('#view-medications').on('click', function(e) {
		e.preventDefault();
		$('#view-medications-overlay').show();
	});

	$('.done-btn').on('click', function(e) {
		e.preventDefault();
		$('.overlay').hide();
	});

});