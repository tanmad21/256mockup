document.addEventListener("DOMContentLoaded", function() {
			
	function ShowTime() {
		var dt = new Date();
		document.getElementById("time").innerHTML = dt.toLocaleTimeString();
 	}

	ShowTime();
	var today = new Date();
	var days = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	var todayEl = document.getElementById('date');
	todayEl.innerHTML = today.getDate() + " " + days[today.getMonth()] + " 	" + today.getFullYear();

	window.setInterval(ShowTime,1000);
});