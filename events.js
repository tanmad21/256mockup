document.addEventListener("DOMContentLoaded", function() {
	
	$('#view-medications').on('click', function(e) {
			e.preventDefault();
			$('#view-medications-overlay').show();
		});
	
	$('.done-btn').on('click', function(e) {
		e.preventDefault();
		$('.overlay').hide();
	});
});

// This is the Database of Upcoming Events
//
// 8 Fields (surrounded by brackets[]) are used for EACH event:
// 	["Recurring", "Month", "Day", "Year", "Medications", "Time"]
// 	Each event field must be be surrounded by quotation marks followed by a comma ("",) EXCEPT the "Description" field.
//	The "Description" field is surrounded by quotation marks only ("").
//
// The Recurring field uses:
//	"D" = Daily; "W" = Weekly
//
// Daily events do NOT require that anything be in the Month Day and Year fields
//
// Weekly events should have the day of the week field set to 1 - 7
//	1=Sunday, 2=Monday, 3=Tuesday, 4=Wednesday, 5=Thurday, 6=Friday, 7=Saturday

// entries in array are stored by disbursement times during the day
medications = new Array(
	["D",	"",	"",	"",	"Aspirin, Glipizide, Lisinopril, Meloxican",	"7:00 AM"],
	["D",	"",	"",	"",	"Glipizide", 									"1:00 PM"],
	["D",	"",	"",	"",	"Aspirin, Glipizide",							"7:00 PM"],
	["D",	"",	"",	"",	"Ibuprofen", 									"As Needed"]
	// ["D",	"",	"",	"",	"7:00 AM",	"",	"Meloxican", ""],
	// ["D",	"",	"",	"",	"7:00 AM, 1:00 PM, 7:00 PM",	"",	"Glipizide", ""],
	// ["D",	"",	"",	"",	"7:00 AM",	"",	"Lisinopril", ""],
	// ["D",	"",	"",	"",	"Only if needed", "", "Ibuprofen", ""],
	// ["D",	"",	"",	"",	"7:00 AM, 7:00 PM",	"",	"Aspirin", ""]
);

numDays = new Array( 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

function getNumDays(month) {
	// month is one based, so subtract 1 from it
	return numDays[month - 1];
}

/* Preload images script */
var myimages=new Array()

function preloadimages(){
	for (i=0;i<preloadimages.arguments.length;i++){
		myimages[i]=new Image();
		myimages[i].src=preloadimages.arguments[i];
	}
}

preloadimages("images/PrevMonOff.jpg","images/PrevMoOn.jpg","images/NextMonOff.jpg","images/NextMoOn.jpg");

/***************************************************************************************
Functions
	changedate(): Moves to next or previous month or year, or current month depending on the button clicked.
	createCalendar(): Renders the calander into the page with links for each to fill the date form filds above.
			
***************************************************************************************/

var thisDate = 1;							// Tracks current date being written in calendar
var wordMonth = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
var today = new Date();							// Date object to store the current date
var todaysDay = today.getDay() + 1;					// Stores the current day number 1-7
var todaysDate = today.getDate();					// Stores the current numeric date within the month
var todaysMonth = today.getUTCMonth() + 1;				// Stores the current month 1-12
var todaysYear = today.getFullYear();					// Stores the current year
var monthNum = todaysMonth;						// Tracks the current month being displayed
var yearNum = todaysYear;						// Tracks the current year being displayed
var firstDate = new Date(String(monthNum)+"/1/"+String(yearNum));	// Object Storing the first day of the current month
var firstDay = firstDate.getUTCDay();					// Tracks the day number 1-7 of the first day of the current month
var lastDate = new Date(String(monthNum +1)+"/1/"+String(yearNum));	// Tracks the last date of the current month
var numbDays = 0;
var calendarString = "";

function changedate(buttonpressed) {
	if (buttonpressed == "prevmo") monthNum--;
	else if (buttonpressed == "nextmo") monthNum++;

	if (monthNum == 0) {
		monthNum = 12;
		yearNum--;
	}
	else if (monthNum == 13) {
		monthNum = 1;
		yearNum++
	}

	lastDate = new Date(String(monthNum+1)+"/1/"+String(yearNum));
	numbDays = getNumDays(monthNum);
	firstDate = new Date(String(monthNum)+"/1/"+String(yearNum));
	firstDay = firstDate.getDay() + 1;
	createCalendar();
	return;
}

function createCalendar() {
	calendarString = '';
	var daycounter = 0;
	calendarString += '<table width="900" border="1" cellpadding="0" cellspacing="1">';
	calendarString += '<tr>';
	calendarString += '<td align=\"center\" valign=\"center\" width=\"40\" height=\"40\"><a href=\"#\" width=\"40\" height=\"40\" border=\"0\" \/><\/a><\/td>';
	calendarString += '<td align=\"center\" valign=\"center\" width=\"40\" height=\"40\"><a href=\"#\" onMouseOver=\"document.PrevMo.src=\'images\/PrevMoOn\.jpg\';\" onMouseOut=\"document.PrevMo.src=\'images\/PrevMonOff\.jpg\';\" onClick=\"changedate(\'prevmo\')\"><img name=\"PrevMo\" src=\"images\/PrevMonOff\.jpg\" width=\"40\" height=\"40\" border=\"0\" alt=\"Prev Mo\"\/><\/a><\/td>';
	calendarString += '<td bgcolor=\"#4D394B\" style=\" color:white;\" align=\"center\" valign=\"center\" width=\"128\" height=\"40\" colspan=\"3\"><b>' + wordMonth[monthNum-1] + '&nbsp;&nbsp;' + yearNum + '<\/b><\/td>';
	calendarString += '<td align=\"center\" valign=\"center\" width=\"40\" height=\"40\"><a href=\"#\" onMouseOver=\"document.NextMo.src=\'images\/NextMoOn\.jpg\';\" onMouseOut=\"document.NextMo.src=\'images\/NextMonOff\.jpg\';\" onClick=\"changedate(\'nextmo\')\"><img name=\"NextMo\" src=\"images\/NextMonOff\.jpg\" width=\"40\" height=\"40\" border=\"0\" alt=\"Next Mo\"\/><\/a><\/td>';
	calendarString += '<td align=\"center\" valign=\"center\" width=\"40\" height=\"40\"><a href=\"#\" width=\"40\" height=\"40\" border=\"0\" \/><\/a><\/td>';
	calendarString += '<\/tr>';
	calendarString += '<tr>';
	calendarString += '<td bgcolor=\"#DDDDDD\" align=\"center\" valign=\"center\" width=\"60\" height=\"40\">Sun<\/td>';
	calendarString += '<td bgcolor=\"#DDDDDD\" align=\"center\" valign=\"center\" width=\"60\" height=\"40\">Mon<\/td>';
	calendarString += '<td bgcolor=\"#DDDDDD\" align=\"center\" valign=\"center\" width=\"60\" height=\"40\">Tue<\/td>';
	calendarString += '<td bgcolor=\"#DDDDDD\" align=\"center\" valign=\"center\" width=\"60\" height=\"40\">Wed<\/td>';
	calendarString += '<td bgcolor=\"#DDDDDD\" align=\"center\" valign=\"center\" width=\"60\" height=\"40\">Thu<\/td>';
	calendarString += '<td bgcolor=\"#DDDDDD\" align=\"center\" valign=\"center\" width=\"60\" height=\"40\">Fri<\/td>';
	calendarString += '<td bgcolor=\"#DDDDDD\" align=\"center\" valign=\"center\" width=\"60\" height=\"40\">Sat<\/td>';
	calendarString += '<\/tr>';

	thisDate == 1;

	for (var i = 1; i <= 6; i++) {
		calendarString += '<tr>';
		for (var x = 1; x <= 7; x++) {
			daycounter = (thisDate - firstDay)+1;
			thisDate++;
			if ((daycounter > numbDays) || (daycounter < 1)) {
				calendarString += '<td align=\"center\" bgcolor=\"#DDDDDD\" height=\"50\" width=\"60\">&nbsp;<\/td>';
			} else {
				if (checkMeds(daycounter,monthNum,yearNum,i,x) || ((todaysDay == x) && (todaysDate == daycounter) && (todaysMonth == monthNum))){
					if ((todaysDay == x) && (todaysDate == daycounter) && (todaysMonth == monthNum)) {	// todays date
						calendarString += '<td align=\"center\" bgcolor=\"#4D8C8C\" height=\"60\" width=\"60\"><a href=\"javascript:showMeds(' + daycounter + ',' + monthNum + ',' + yearNum + ',' + i + ',' + x + ')\">' + daycounter + '<\/a><\/td>';
					}
 					else	// any other day that has meds
 						calendarString += '<td align=\"center\" bgcolor=\"#FFFFFF\" height=\"60\" width=\"60\"><a href=\"javascript:showMeds(' + daycounter + ',' + monthNum + ',' + yearNum + ',' + i + ',' + x + ')\">' + daycounter + '<\/a><\/td>';
				} else {	// day with no meds
					calendarString += '<td align=\"center\" bgcolor=\"#DDFFFF\" height=\"60\" width=\"60\">' + daycounter + '<\/td>';
				}
			}
		}
		calendarString += '<\/tr>';
	}
	calendarString += '<\/table>';
	
	var object=document.getElementById('calendar');
	object.innerHTML= calendarString;
	thisDate = 1;
}


function checkMeds(day,month,year,week,dayofweek) {
var numMeds = 0;
var floater = 0;

	for (var i = 0; i < medications.length; i++) {
		if (medications[i][0] == "D") {
			numMeds++;
		}
		else if (medications[i][0] == "W") {
			if ((medications[i][2] == dayofweek)) numMeds++;
		}
		else if ((medications[i][2] == day) && (medications[i][1] == month) && (medications[i][3] == year)) {
			numMeds++;
		}
	}
	if (numMeds == 0) {
		return false;
	} else {
		return true;
	}
}

function showMeds(day,month,year,week,dayofweek) {
	var theevent = "<ul id='drug-list'>";
	theevent += "<li> <div class='col-sm-12 drug-date'>" + month + '/' + day + '/' + year + "</div> </li>";
	var floater = 0;
	for (var i = 0; i < medications.length; i++) {
		if (medications[i][0] != "") {
			if (medications[i][0] == "D") {
				theevent += "<li> <div class='col-sm-5 drug-name'>" + medications[i][5] + "</div> <div class='col-sm-7 drug-data'>" + medications[i][4] +  "</div> </li>" + '\n';
			}
			else if (medications[i][0] == "W") {
				if ((medications[i][2] == dayofweek)) {
					theevent += "<li> <div class='col-sm-5 drug-name'>" + medications[i][5] + "</div> <div class='col-sm-7 drug-data'>" + medications[i][4] +  "</div> </li>" + '\n';
				}
			}
		}
		else if ((medications[i][2] == day) && (medications[i][1] == month) && (medications[i][3] == year)) {
			theevent += "<li> <div class='col-sm-5 drug-name'>" + medications[i][5] + "</div> <div class='col-sm-7 drug-data'>" + medications[i][4] +  "</div> </li>" + '\n';
		}
	}
	theevent+= "</ul>";
	document.getElementById("drug-list-container").innerHTML =theevent;
	$('#view-medications-overlay').show();
}