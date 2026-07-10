/* helper_functions.js */

/*
	Name: Helper Functions
	Author: Graham Johnson
	Date: 9 Jul 26

	Purpose: Implement helper functions used across multiple templates for the
	standalone Electronic Invitation creator. 
*/

/** 
 * Formats a date string into a "Month Day, Year" format.
 * @param {string} dateString - The raw value from <input type="date"> (YYYY-MM-DD)
 * @returns {string} Formatted string (e.g., "18 Jul 26")
 */
function formatSimpleDateMilitary(dateString) {
   	if (!dateString) return "";

		const parts = dateString.split('-');
		const year = parseInt(parts[0], 10).slice(-2);
		const month = parseInt(parts[1], 10) - 1; // JS months are 0-indexed
		const day = parseInt(parts[2], 10);

		return `${day} ${month} ${year}`
}

/**
 * Formats a date string into a "Month Day, Year" format.
 * @param {string} dateString - The raw value from <input type="date"> (YYYY-MM-DD)
 * @returns {string} Formatted string (e.g., "July 18, 2026")
 */
function formatSimpleDate(dateString) {
		if (!dateString) return "";

		const parts = dateString.split('-');
		const year = parseInt(parts[0], 10);
		const month = parseInt(parts[1], 10) - 1; // JS months are 0-indexed
		const day = parseInt(parts[2], 10);

		const date = new Date(year, month, day);

		// Use toLocaleDateString for a clean, localized format
		return date.toLocaleDateString('en-US', {
    		year: 'numeric',
    		month: 'long',
    		day: 'numeric'
		});
}

/**
 * Formats hours and minutes into military format
 * @param {number|string} hour - Hour of the day (0-23)
 * @param {number|string} minutes - Minutes of the hour (0-59)
 * @returns {string} Formatted string (e.g., "1533")
 */
function formatEventTimeMilitary(hour, minutes) {
	// 1. Cast inputs to integers to ensure mathematical integrity
	let h = parseInt(hour, 10);
	let m = parseInt(minutes, 10);

	// Error checking for invalid inputs
 	if (isNaN(h) || isNaN(m)) return "";

	// 2. Construct the output string by padding hours and minutes
	const paddedHours = String(h).padStart(2, '0');
	const paddedMinutes = String(m).padStart(2, '0');
	return `${paddedHours}${paddedMinutes}`;
}

/**
 * Formats 24-hour time into a descriptive colloquial string.
 * @param {number|string} hour - Hour of the day (0-23)
 * @param {number|string} minutes - Minutes of the hour (0-59)
 * @returns {string} Formatted string (e.g., "at 7 o'clock in the evening" or "at 7 o'clock and 30 minutes in the morning")
 */
function formatEventTime(hour, minutes) {
	// 1. Cast inputs to integers to ensure mathematical integrity
	let h = parseInt(hour, 10);
	let m = parseInt(minutes, 10);

	// Fallback check for invalid inputs
 	if (isNaN(h) || isNaN(m)) return "";

	// 2. Determine the time period of the day
	let period = "morning";
	
	// 1200 to 1700
	if (h >= 12 && h < 17) {
		period = "afternoon";
	} 
	else if (h >= 17 || h < 4) { 
		// From 5:00 PM (17:00) to 3:59 AM (03:59) is classified as evening/night
		period = "evening";
	}

	// 3. Convert from 24-hour scale to 12-hour scale
	let displayHour = h % 12;

	if (displayHour === 0) {
		displayHour = 12; // Handle midnight and noon boundary conditions
	}

	// 4. Construct the output string based on whether minutes are present
	if (m === 0) {
		return `at ${displayHour} o’clock in the ${period}`;
	} 
	else {
		const minutesString = String(m);
		return `at ${displayHour} o'clock and ${minutesString} minutes in the ${period}`;
	}
}

/**
 * Formats an HTML date input string (YYYY-MM-DD) into "on DayOfWeek, the DD[ordinal] of Month"
 * @param {string} dateString - The raw value from <input type="date">
 * @returns {string} Formatted date string (e.g., "on Wednesday, the 23rd of July")
*/
function formatEventDate(eventDateString) {
	if (!eventDateString) return "";

		// 1. Parse YYYY-MM-DD manually to avoid UTC/Local timezone shift bugs
		const parts = eventDateString.split('-');
		const year = parseInt(parts[0], 10);
		const month = parseInt(parts[1], 10) - 1; // JS Months are 0-indexed (0 = Jan)
		const day = parseInt(parts[2], 10);

		const eventDate = new Date(year, month, day);

		// 2. Get the full Day and Month names using the browser's built-in Internationalization API
		const dayOfWeek = eventDate.toLocaleDateString('en-US', { weekday: 'long' });
		const monthName = eventDate.toLocaleDateString('en-US', { month: 'long' });

		// 3. Mathematical check to get the correct ordinal suffix (1st, 2nd, 3rd, 4th...)
		const getOrdinalSuffix = (d) => {
			if (d > 3 && d < 21) return 'th'; 
			switch (d % 10) {
  				case 1:  return "st";
  				case 2:  return "nd";
  				case 3:  return "rd";
  				default: return "th";
			}
	 	};

		const dayWithSuffix = day + getOrdinalSuffix(day);

		// 4. Construct and return the final string
	return `on ${dayOfWeek}, the ${dayWithSuffix} of ${monthName}`;
}

/**
 * Adds an event listener to print to PDF
 * @param {string} documentPrintButtonId - ID for the print to PDF button
 * @returns none
*/
function initializePrintToPDFButton(documentPrintButtonId) {
	const printButton = document.getElementById(documentPrintButtonId);
	if (printButton) {
		printButton.addEventListener('click', function() {
    	window.print();
		});
	}
}

/**
 * Adds an event listener to the "Email Invitation" button
 * @param {string} emailButtonId - ID for Email Invitation button
 * @returns none
*/
function initializeEmailButton(emailButtonId) {
    const emailButton = document.getElementById(emailButtonId);
    if (!emailButton) return; // Exit early if the button doesn't exist on this page

    emailButton.addEventListener('click', function() {
        // Get the data object from session storage
        const storedData = sessionStorage.getItem('eventPayload');
        if (!storedData) {
            alert("Event data not found. Please regenerate the invitation.");
            return;
        }
        const eventData = JSON.parse(storedData);

        // Call your existing helper functions directly
        const prettyEmailDate = formatEventDate(eventData.event_date).slice(3);
        const eventShortDate = formatSimpleDate(eventData.event_date);
        const eventMilitaryTime = formatEventTimeMilitary(eventData.event_hours, eventData.event_minutes);
        const rsvpLink = eventData.rsvp_link || '';

        // 1. Construct the email subject
        const subject = `${eventData.event_name || 'Event Invitation'} - ${prettyEmailDate || ''}`;

        // 2. Construct the email body
        let body = `You are cordially invited to the ${eventData.event_name || 'Event Invitation'},\n\n` +
             "Please see the attached invitation for event details. Event summary:\n\n" +
             `WHO: \n` + 
             `WHAT: ${eventData.event_name}\n` +
             `WHEN: ${eventShortDate} at ${eventMilitaryTime}\n` +
             `WHERE: ${eventData.location}, ${eventData.city}, ${eventData.state}\n` +
             `WHY: \n\n` +
             `Military Dress: ${eventData.military_dress_code}\n` +
             `Civilian Dress: ${eventData.civilian_dress_code}\n\n`; 

        // 3. Add RSVP link if it exists
        if (rsvpLink) {
            body += "To RSVP for this event, please click the link below:\n";
            body += `${rsvpLink}\n\n`;
        }

        // 4. URL-encode components
        const encodedSubject = encodeURIComponent(subject);
        const encodedBody = encodeURIComponent(body);

        // 5. Trigger the email client
        const mailtoLink = `mailto:?subject=INVITATION: ${encodedSubject}&body=${encodedBody}`;
        window.location.href = mailtoLink;
    });
}


/**
 * Adds an event listener to the "Copy as Image" button
 * @param {string} documentEmailButtonId - ID for Email Invitation button
 * @returns none
*/
function initializeCopyImageButton(copyImageButtonId, invitaionBorderId) {

	const copyImageButton = document.getElementById('copy-image-btn');
	if (!copyImageButton || !invitaionBorderId) return; // Exit early if the button doesn't exist on this page

    copyImageButton.addEventListener('click', function() {
        const invitationElement = document.querySelector(invitaionBorderId);

        // Use html2canvas to render the div
        html2canvas(invitationElement, {
            useCORS: true // Important for external images
        }).then(canvas => {
            // The 'canvas' element now holds our image
            // Convert the canvas to a Blob to copy it
            canvas.toBlob(function(blob) {
                try {
                    // Use the modern Clipboard API to write the image blob
                    navigator.clipboard.write([
                        new ClipboardItem({ 'image/png': blob })
                    ]);
                    alert("Invitation image copied! Open Outlook and press Paste (Ctrl+V).");
                } catch (error) {
                    console.error('Failed to copy image:', error);
                    alert('Could not copy the image automatically. Please try another method.');
                }
            });
        });
    });   
}

/**
 * Gets the luminance (sum of r, g, b values) for a color
 * @param {int} r - red luminance (0-255)
 * @param {int} g - green luminace (0-255)
 * @param {int} b - blue luminace (0-255)
 * @returns {int} luminance - relative luminance of the color
*/
function getLuminance(r, g, b) {
    const a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928
            ? v / 12.92
            : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

/**
 * Gets the contrast color for the given color
 * @param {string} rgbString - string representing the color
 * @returns {string} color - black or white, based on the input color
*/
function getContrastColor(rgbString) {
    const rgb = rgbString.match(/\d+/g).map(Number);
    const luminance = getLuminance(rgb[0], rgb[1], rgb[2]);
    return luminance > 0.179 ? "black" : "white";
}