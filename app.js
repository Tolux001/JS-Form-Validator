const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById("password2");
const form = document.getElementById("form");

/*
Wrote bare code in the event listener, then carried it into a function to make it useable by other input field
*/

// Function for error/success message, input border/text/placeholder outlook 
const errorMessage = (inputName, message) => {
	// Accessing the parent element of the input field
	const parent = inputName.parentElement;
	parent.classList.add("error");

	// accessing the error message through the parent
	const small = parent.querySelector("small");
	small.textContent = `${inputName.name} ${message} ${inputName.name}`;
} 

const successMessage = (inputName) => {
    const parent = inputName.parentElement;		
    parent.classList.remove("error");
	parent.classList.add("success");
} 

const getInfoMessage = (inputName) => {
    if (inputName.value.trim() == '') {
        errorMessage(inputName, "cannot be empty, please fill your");
    } else {
		successMessage(inputName);
	}
}

// Getting input for the function getInfoMessage
const getInput = (array) => {
    const arrayMethod = array.forEach((value) => {
        getInfoMessage(value);
    })
    return arrayMethod
}

//Error message for only username
const lengthError = (inputName, min, max)=> {
    if (
		inputName.value.trim().length > 0 &&
		inputName.value.trim().length < min
    ) {
        errorMessage(inputName, "cannot be less than 3...");
	} else if (inputName.value.trim().length > max) {
        errorMessage(inputName, "cannot be greater than 10...");
	}
}

// Password Match
const passwordMatch = (password1, password2) => {
    if (password1.value !== password2.value) {
        errorMessage(password2, "does not match, confirm");
    }
}

// Javascript Email Regex
const getEmail = (email) => {
    const validateEmail = (email) => {
			return String(email)
				.toLowerCase()
				.match(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				);
	};
    if (validateEmail(email.value)) {
        successMessage(email);
    } else {
		errorMessage(email, "does not match standard EMAIL FORMAT--");
	}
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    getInput([username, password, password2]);
    lengthError(username, 4, 10);
    passwordMatch(password, password2);
    getEmail(email);
})

