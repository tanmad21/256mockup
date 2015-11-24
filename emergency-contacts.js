document.addEventListener("DOMContentLoaded", function() {

	var contactStringHTML = "<div class='col-sm-6 contact-name'>DANAME</div><div class='col-sm-5 contact-number'>DAPHONE</div><div class='col-sm-1 contact-delete'>X</div><div class='confirm-bubble'>Delete Contact?<div class='row'><div class='col-sm-10 col-sm-offset-1'><button class='btn btn-danger confirm-delete-btn col-sm-6' onclick='confirmDeleteContact(this)'>Yes</button><button class='btn btn-info cancel-delete-btn col-sm-6' onclick='cancelDeleteContact(this)'>No</button></div></div></div>";
	var deleteButtons = document.getElementsByClassName('contact-delete');
	var nameElement = document.getElementById('new-contact-name');
	var phoneElement = document.getElementById('new-contact-number');
	var contactsElement = document.getElementById('contacts');

	new InputMask().Initialize(document.querySelectorAll("#new-contact-number"),
	{
		mask: InputMaskDefaultMask.Phone, 
		placeHolder: "phone"
	});

	for(var i = 0; i < deleteButtons.length; i++) {
		deleteButtons[i].onclick = deleteContact;
	}

	$('#minutes').iPhonePicker({ width: '80px', imgRoot: 'Images/UIPickerView/', height: '100px' });
	$('#hours').iPhonePicker({ width: '80px', imgRoot: 'Images/UIPickerView/', height: '100px' });

	function deleteContact(e) {
		var bubble = this.nextElementSibling;
		bubble.classList.add('confirm-bubble-active');
		bubble.classList.remove('confirm-bubble');
	}

	document.getElementById('contact-save').onclick = addContact;

	function addContact(e) {
		var name = nameElement.value;
		var number = phoneElement.value;
		if(name.trim() == '') {
			alert('Please enter a name.');
			return;
		} else if(!validPhoneNumber(number)) {
			alert('Please enter a valid phone number.');
			return;
		}

		var temp = contactStringHTML.replace('DANAME',name);
		temp = temp.replace('DAPHONE',number);

		var newContactElement = document.createElement('div');
		newContactElement.innerHTML = temp;

		newContactElement.classList.add('row');
		newContactElement.classList.add('contact');

		var refChild = getClosestClass(this,'contact');
		contactsElement.insertBefore(newContactElement, refChild);

		var deleteButtons = document.getElementsByClassName('contact-delete');
		deleteButtons[deleteButtons.length-1].onclick = deleteContact;

		nameElement.value = '';
		phoneElement.value = '';
	}

	function validPhoneNumber(number) {
		return number.length === 14;
	}

});

function confirmDeleteContact(e) {
	getClosestClass(e,'contact').remove();
}

function cancelDeleteContact(e) {
	var el = getClosestClass(e,'confirm-bubble-active');
	el.classList.add('confirm-bubble');
	el.classList.remove('confirm-bubble-active');
}

function getClosestClass (elem, className) {

    // Get closest match
    for ( ; elem && elem !== document; elem = elem.parentNode ) {

        // If className is a class
        if ( elem.classList.contains(className) ) {
            return elem;
        }
    }
    return false;
}