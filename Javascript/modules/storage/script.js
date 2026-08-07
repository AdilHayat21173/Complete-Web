// localstorage
// Add / Save data
localStorage.setItem("username", "Adil");

// Get data
localStorage.getItem("username");

// Remove data
localStorage.removeItem("username");

// Update data
localStorage.setItem("username", "Ahmed");

// sessionStorage for temporary storage
// Add / Save data
sessionStorage.setItem("username", "Adil");

// Get data
sessionStorage.getItem("username");

// Update data
sessionStorage.setItem("username", "Ahmed");

// Remove data
sessionStorage.removeItem("username");

// Remove everything
sessionStorage.clear();



// Add / Save cookie
document.cookie = "username=Adil";

// Get cookies
console.log(document.cookie);

// Update cookie
document.cookie = "username=Ahmed";

// Delete cookie
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";

// Cookie expires after 7 days
document.cookie = "username=Adil; max-age=604800";