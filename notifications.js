document.addEventListener("DOMContentLoaded", function() {

	var numDays = 5;
	
	var numDaysEl = document.getElementById('lq-days');

	function updateDays() {
		var temp = numDays;
		if(temp < 10) {
			temp = '0' + temp;
		}
		var html = numDaysEl.innerHTML;
		numDaysEl.innerHTML = temp + html.substring(2);
		setListeners();
	}

	function setListeners() {
		document.getElementById('lq-plus').onclick = function() {
			numDays++;
			if(numDays > 99) numDays = 99;
			updateDays();
		}
		document.getElementById('lq-minus').onclick = function() {
			numDays--;
			if(numDays < 0) numDays = 0;
			updateDays();
		}
	}

	setListeners();

});