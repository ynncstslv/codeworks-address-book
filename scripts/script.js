$(document).ready(function () {
	// application view state variables
	const $noContacts = $('#noContacts');
	const $savedContacts = $('#savedContacts');

	// add contact button variable
	const $addBtn = $('#addBtn');

	// modal variables
	const $addModal = $('#addModal');
	const $closeBtn = $('#closeBtn');
	const $saveBtn = $('#saveBtn');

	// hiding some elements by default
	$addModal.hide();
	$savedContacts.hide();

	// when the addBtn is clicked, show addModal
	$addBtn.click(function () {
		$addModal.show();
	});

	// when the closeBtn is clicked, hide addModal
	$closeBtn.click(function () {
		$addModal.hide();
	});

	// saving a contact and updating the application view state
	$saveBtn.click(function (e) {
		// prevents the submit
		e.preventDefault();

		// getting the values from the form
		const getFirstName = $('input[name="add-name"]').val();
		const getLastName = $('input[name="add-surname"]').val();
		const getPhone = $('input[name="add-phone"]').val();
		const getEmail = $('input[name="add-email"]').val();
		const getAddress = $('input[name="add-address"]').val();
		const getLabel = $('input[name="add-label"]:checked').val();

		// creating a new contact card
		const $contactCard = $('<div>').addClass('contact-card');
		const $contactSaved = $('<div>').addClass('contact-saved');
		const $nameContainer = $('<div>').addClass('contact-name');
		const $nameText = $('<h3>').text(`${getFirstName} ${getLastName}`);
		const $labelContainer = $('<div>').addClass('label');
		const $labelText = $('<p>').text(getLabel);
		const $phoneContainer = $('<div>').addClass('phone');
		const $phoneText = $('<p>').text(getPhone);
		const $emailContainer = $('<div>').addClass('email');
		const $emailText = $('<p>').text(getEmail);
		const $addressContainer = $('<div>').addClass('address');
		const $addressText = $('<p>').text(getAddress);
		const $deleteContainer = $('<div>').addClass('delete');
		const $deleteButton = $('<button>')
			.addClass('btn delete-btn')
			.html('<i class="fa-solid fa-trash"></i>');

		// adding the content to the new contact card
		$nameContainer.append($nameText);
		$labelContainer.append($labelText);
		$phoneContainer.append($phoneText);
		$emailContainer.append($emailText);
		$addressContainer.append($addressText);
		$deleteContainer.append($deleteButton);

		$contactSaved.append(
			$nameContainer,
			$labelContainer,
			$phoneContainer,
			$emailContainer,
			$addressContainer,
			$deleteContainer
		);

		$contactCard.append($contactSaved);

		// inserting the new contact in alphabetical order
		const $contacts = $savedContacts.find('.contact-card');
		let inserted = false;

		$contacts.each(function () {
			const contactName = $(this).find('.contact-name h3').text();

			if (getFirstName.toLowerCase() < contactName.toLowerCase()) {
				$(this).before($contactCard);
				inserted = true;
				return false;
			}
		});
		if (!inserted) {
			$savedContacts.append($contactCard);
		}

		// clearing the form after adding a new contact
		$('form')[0].reset();

		// hiding the addModal and showing the saved-contacts after clicking on saveBtn
		$addModal.hide();
		$noContacts.hide();
		$savedContacts.show();

		// set the background-color of the card based on label choice
		$('.contact-card').each(function () {
			let $contactCard = $(this);
			let label = $contactCard.find('.label').text();

			if (label === 'Family') {
				$contactCard.css('background-color', 'var(--color-family)');
			} else if (label === 'Friends') {
				$contactCard.css('background-color', 'var(--color-friends)');
			} else if (label === 'Work') {
				$contactCard.css('background-color', 'var(--color-work)');
			} else {
				$contactCard.css('background-color', 'var(--color-light)');
			}
		});

		// deleting a contact when clicking the delete-btn
		$(document).on('click', '.delete-btn', function () {
			var $contactCard = $(this).closest('.contact-card');
			var contactName = $contactCard.find('.contact-name h3').text();

			// Remove the contact card
			$contactCard.remove();

			// Check if there are any contacts left
			var remainingContacts = $('.saved-contacts .contact-card');
			if (remainingContacts.length === 0) {
				// Show the "no-contacts" message
				$noContacts.show();
				// Hide the saved contacts
				$savedContacts.hide();
			}
		});

		// searching contacts by character on their name
		$('#searchBtn').click(function () {
			const searchText = $('#searchInput').val().toLowerCase();

			$('.contact-card').each(function () {
				const contactName = $(this)
					.find('.contact-name h3')
					.text()
					.toLowerCase();

				if (contactName.includes(searchText)) {
					$(this).show();
				} else {
					$(this).hide();
				}
			});
		});
	});
});
