        const registrationForm = document.getElementById('registration-form');
        const studentNameInput = document.getElementById('studentName');
        const studentIdInput = document.getElementById('studentId');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const dobInput = document.getElementById('dob');
        const genderSelect = document.getElementById('gender');
        const courseInput = document.getElementById('course');
        const successMessage = document.getElementById('success-message');

        /**
         * Shows an error message for a given input field.
         * @param {HTMLElement} element - The input element.
         * @param {string} message - The error message to display.
         */
        function showError(element, message) {
            const formGroup = element.closest('.form-group');
            formGroup.classList.add('invalid');
            const errorMessageElem = formGroup.querySelector('.error-message');
            if (errorMessageElem) {
                errorMessageElem.textContent = message;
                errorMessageElem.style.display = 'block';
            }
        }

        /**
         * Hides the error message for a given input field.
         * @param {HTMLElement} element - The input element.
         */
        function hideError(element) {
            const formGroup = element.closest('.form-group');
            formGroup.classList.remove('invalid');
            const errorMessageElem = formGroup.querySelector('.error-message');
            if (errorMessageElem) {
                errorMessageElem.style.display = 'none';
            }
        }

        /**
         * Validates the student name field.
         * @returns {boolean} True if valid, false otherwise.
         */
        function validateStudentName() {
            const name = studentNameInput.value.trim();
            if (name.length < 3) {
                showError(studentNameInput, 'Student name is required and must be at least 3 characters long.');
                return false;
            }
            hideError(studentNameInput);
            return true;
        }

        /**
         * Validates the student ID field.
         * @returns {boolean} True if valid, false otherwise.
         */
        function validateStudentId() {
            const id = studentIdInput.value.trim();
            // Regex for alphanumeric, allows letters and numbers
            const idRegex = /^[a-zA-Z0-9]+$/;
            if (id === '' || !idRegex.test(id)) {
                showError(studentIdInput, 'Student ID is required and must be alphanumeric (e.g., S12345).');
                return false;
            }
            hideError(studentIdInput);
            return true;
        }

        /**
         * Validates the email field.
         * @returns {boolean} True if valid, false otherwise.
         */
        function validateEmail() {
            const email = emailInput.value.trim();
            // Basic email regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError(emailInput, 'A valid email address is required.');
                return false;
            }
            hideError(emailInput);
            return true;
        }

        /**
         * Validates the phone number field (optional).
         * @returns {boolean} True if valid or empty, false otherwise.
         */
        function validatePhone() {
            const phone = phoneInput.value.trim();
            // Optional: Basic phone number regex (allows digits, spaces, hyphens, plus sign)
            const phoneRegex = /^\+?[0-9\s-]{7,20}$/; // Adjust regex as needed for specific formats
            if (phone !== '' && !phoneRegex.test(phone)) {
                showError(phoneInput, 'Please enter a valid phone number (optional).');
                return false;
            }
            hideError(phoneInput);
            return true;
        }

        /**
         * Validates the date of birth field.
         * @returns {boolean} True if valid, false otherwise.
         */
        function validateDob() {
            const dob = dobInput.value;
            if (dob === '') {
                showError(dobInput, 'Date of Birth is required.');
                return false;
            }
            // Optional: Check if the date is in the past and reasonable
            const selectedDate = new Date(dob);
            const today = new Date();
            if (selectedDate > today) {
                showError(dobInput, 'Date of Birth cannot be in the future.');
                return false;
            }
            hideError(dobInput);
            return true;
        }

        /**
         * Validates the gender selection.
         * @returns {boolean} True if valid, false otherwise.
         */
        function validateGender() {
            const gender = genderSelect.value;
            if (gender === '') {
                showError(genderSelect, 'Gender is required.');
                return false;
            }
            hideError(genderSelect);
            return true;
        }

        /**
         * Validates the course enrolled field.
         * @returns {boolean} True if valid, false otherwise.
         */
        function validateCourse() {
            const course = courseInput.value.trim();
            if (course === '') {
                showError(courseInput, 'Course Enrolled is required.');
                return false;
            }
            hideError(courseInput);
            return true;
        }

        // Add event listeners for real-time validation feedback
        studentNameInput.addEventListener('input', validateStudentName);
        studentIdInput.addEventListener('input', validateStudentId);
        emailInput.addEventListener('input', validateEmail);
        phoneInput.addEventListener('input', validatePhone);
        dobInput.addEventListener('change', validateDob); // Use 'change' for date input
        genderSelect.addEventListener('change', validateGender);
        courseInput.addEventListener('input', validateCourse);


        /**
         * Handles the form submission.
         * @param {Event} event - The form submission event.
         */
        registrationForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent default form submission

            // Run all validations
            const isNameValid = validateStudentName();
            const isIdValid = validateStudentId();
            const isEmailValid = validateEmail();
            const isPhoneValid = validatePhone(); // Optional field, only validates if not empty
            const isDobValid = validateDob();
            const isGenderValid = validateGender();
            const isCourseValid = validateCourse();

            // Check if all required fields are valid
            if (isNameValid && isIdValid && isEmailValid && isPhoneValid && isDobValid && isGenderValid && isCourseValid) {
                // If all validations pass, collect form data
                const formData = {
                    studentName: studentNameInput.value.trim(),
                    studentId: studentIdInput.value.trim(),
                    email: emailInput.value.trim(),
                    phone: phoneInput.value.trim(),
                    dob: dobInput.value,
                    gender: genderSelect.value,
                    course: courseInput.value.trim()
                };

                console.log('Form data is valid:', formData);

                // --- This is where you would send data to your Java backend ---
                // Example of how you might send data using fetch API:
                /*
                try {
                    const response = await fetch('/api/register-student', { // Replace with your actual backend endpoint
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });

                    if (response.ok) {
                        const result = await response.json();
                        console.log('Registration successful:', result);
                        successMessage.textContent = 'Registration successful!';
                        successMessage.style.display = 'block';
                        registrationForm.reset(); // Clear the form
                        // Hide success message after a few seconds
                        setTimeout(() => {
                            successMessage.style.display = 'none';
                        }, 5000);
                    } else {
                        const errorResult = await response.json();
                        console.error('Registration failed:', errorResult);
                        showError(registrationForm.querySelector('button[type="submit"]'), errorResult.message || 'Registration failed. Please try again.');
                    }
                } catch (error) {
                    console.error('Network error or unexpected issue:', error);
                    showError(registrationForm.querySelector('button[type="submit"]'), 'An error occurred. Please try again.');
                }
                */

                // For demonstration, just show success message and clear form
                successMessage.textContent = 'Registration successful! (Data logged to console, ready for backend integration)';
                successMessage.style.display = 'block';
                registrationForm.reset(); // Clear the form
                // Hide success message after a few seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);

            } else {
                console.log('Form has validation errors.');
                successMessage.style.display = 'none'; // Hide success message if there are errors
            }
        });
    

	
	if ('WebSocket' in window) {
		(function () {
			function refreshCSS() {
				var sheets = [].slice.call(document.getElementsByTagName("link"));
				var head = document.getElementsByTagName("head")[0];
				for (var i = 0; i < sheets.length; ++i) {
					var elem = sheets[i];
					var parent = elem.parentElement || head;
					parent.removeChild(elem);
					var rel = elem.rel;
					if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
						var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
						elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
					}
					parent.appendChild(elem);
				}
			}
			var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
			var address = protocol + window.location.host + window.location.pathname + '/ws';
			var socket = new WebSocket(address);
			socket.onmessage = function (msg) {
				if (msg.data == 'reload') window.location.reload();
				else if (msg.data == 'refreshcss') refreshCSS();
			};
			if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
				console.log('Live reload enabled.');
				sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
			}
		})();
	}
	else {
		console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
	}
	