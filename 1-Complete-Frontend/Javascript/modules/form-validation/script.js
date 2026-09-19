// let nm = document.querySelector("#name");
// let form = document.querySelector("form");
// let error = document.querySelector("#nameError");

// form.addEventListener("submit", function(data) {
//     data.preventDefault();

//     if (nm.value.length <= 2) {
//         nm.style.border = "2px solid red";
//         error.textContent = "Please provide a valid name";
//     } else {
//         nm.style.border = "2px solid green";
//         error.textContent = "Name is valid";
//     }
// });


let email = document.querySelector("#email");
let password = document.querySelector("#password");
let form = document.querySelector("form");

form.addEventListener("submit", function(data) {
    data.preventDefault();

    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    let emailValid = emailRegex.test(email.value);
    let passwordValid = passwordRegex.test(password.value);

    if (!emailValid) {
        email.style.border = "2px solid red";
    } else {
        email.style.border = "2px solid green";
        
    }

    if (!passwordValid) {
        password.style.border = "2px solid red";
    } else {
        password.style.border = "2px solid green";
    }
});