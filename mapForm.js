// Initialize the map
var map = L.map('map').setView([9.082, 8.6753], 6); // Default to Nigeria

// Add tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Country Coordinates
const countryCoordinates = {
    "Nigeria": [9.082, 8.6753],
    "Benin": [9.3077, 2.3158],
    "Cameroon": [3.848, 11.5021],
    "Ghana": [7.9465, -1.0232]
};

// Country-State Mapping
const countryStates = {
    "Nigeria": ["Lagos", "Abuja", "Port Harcourt", "Delta"],
    "Benin": ["Cotonou", "Porto-Novo"],
    "Cameroon": ["Yaoundé", "Douala"],
    "Ghana": ["Accra", "Kumasi"]
};

// State Coordinates (for zooming & marker placement)
const stateCoordinates = {
    "Lagos": [6.5244, 3.3792],
    "Abuja": [9.0579, 7.4951],
    "Port Harcourt": [4.8156, 7.0498],
    "Delta": [5.4983, 6.3456],
    "Cotonou": [6.3654, 2.4183],
    "Porto-Novo": [6.4969, 2.6289],
    "Yaoundé": [3.8480, 11.5021],
    "Douala": [4.0511, 9.7679],
    "Accra": [5.6037, -0.1870],
    "Kumasi": [6.6885, -1.6244]
};

// Marker variable (to remove old markers before adding new ones)
let marker = null;

// Update state dropdown based on country selection
function updateStates() {
    var country = document.getElementById("user_country").value;
    var stateSelect = document.getElementById("user_state");

    stateSelect.innerHTML = `<option value="">Choose a state</option>`;

    if (countryStates[country]) {
        countryStates[country].forEach(state => {
            stateSelect.innerHTML += `<option value="${state}">${state}</option>`;
        });
    }
}

// Update map based on selections
function updateMap() {
    var country = document.getElementById("user_country").value;
    var state = document.getElementById("user_state").value;

    if (state && stateCoordinates[state]) {
        map.flyTo(stateCoordinates[state], 10); // Smooth zoom to state
        updateMarker(stateCoordinates[state], state, country);
    } else if (country && countryCoordinates[country]) {
        map.flyTo(countryCoordinates[country], 6); // Zoom to country
        updateMarker(null);
    }
}

// Function to update the marker position with a pop-up
function updateMarker(coords, state = "", country = "") {
    if (marker) {
        map.removeLayer(marker);
    }
    if (coords) {
        marker = L.marker(coords).addTo(map)
            .bindPopup(`<strong>${state}, ${country}</strong>`) // Pop-up text
            .openPopup(); // Automatically open the pop-up
    }
}

// Function to capitalize first letter of each word
function toSentenceCase(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

// Visualize user input
function visualize() {
    var user_name = toSentenceCase(document.getElementById("name").value.trim());
    var user_nationality = toSentenceCase(document.getElementById("nationality").value.trim());
    var user_state = document.getElementById("user_state").value;
    var user_country = document.getElementById("user_country").value;
    var message = document.getElementById("displayMessage");

    // Ensure required fields are filled
    if (!user_name || !user_nationality || !user_country || !user_state) {
        message.innerHTML = "<strong>Please fill all required fields.</strong>";
        message.style.color = "red";
        return;
    }

    // Display message
    var output = `
        <strong>Hello, ${user_name} the ${user_nationality}!</strong> 🌍<br>
        You visualized: <strong>${user_state}, ${user_country}</strong>! 📍<br>
        Thanks for participating! 🎉
    `;
    message.innerHTML = output;
    message.style.color = "black";
}
