// ================================
// Get HTML Elements
// ================================

const cityInput = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");

const cityName = document.querySelector("#cityName");
const temperature = document.querySelector("#temperature");
const condition = document.querySelector("#condition");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");

const message = document.querySelector("#message");


// ================================
// API Key
// ================================

const API_KEY = "add api key";


// ================================
// Search Button
// ================================

searchBtn.addEventListener("click", async function () {

    // Get city name from input
    const city = cityInput.value.trim();

    // Check if input is empty
    if (city === "") {
        message.textContent = "Please enter a city name.";
        return;
    }

    try {

        // Show loading message
        message.textContent = "Loading...";


        // ================================
        // Create API URL
        // ================================

        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;


        // ================================
        // Send Request
        // ================================

        const response = await fetch(url);


        // ================================
        // Check HTTP Response
        // ================================

        if (!response.ok) {
            throw new Error("City not found");
        }


        // ================================
        // Convert Response to JSON
        // ================================

        const data = await response.json();


        // ================================
        // Display Weather Data
        // ================================

        cityName.textContent = data.name;

        temperature.textContent =
            `Temperature: ${data.main.temp}°C`;

        condition.textContent =
            `Condition: ${data.weather[0].description}`;

        humidity.textContent =
            `Humidity: ${data.main.humidity}%`;

        wind.textContent =
            `Wind: ${data.wind.speed} m/s`;


        // Clear message
        message.textContent = "";

    } catch (error) {

        console.log(error);

        // Show error
        message.textContent = error.message;

        // Clear old weather information
        cityName.textContent = "";
        temperature.textContent = "";
        condition.textContent = "";
        humidity.textContent = "";
        wind.textContent = "";
    }
});