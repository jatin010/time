const clockContainer = document.getElementById('clockContainer');
const searchBar = document.getElementById('searchBar');

// List of countries with time zones
const countries = [
    { name: "USA (New York)", timezone: "America/New_York" },
    { name: "UK (London)", timezone: "Europe/London" },
    { name: "India (Delhi)", timezone: "Asia/Kolkata" },
    { name: "Japan (Tokyo)", timezone: "Asia/Tokyo" },
    { name: "Australia (Sydney)", timezone: "Australia/Sydney" },
    { name: "Brazil (São Paulo)", timezone: "America/Sao_Paulo" },
];

// Function to create clocks
function createClocks() {
    clockContainer.innerHTML = ''; // Clear existing clocks

    countries.forEach((country, index) => {
        const clockElement = document.createElement('div');
        clockElement.className = 'clock';

        clockElement.innerHTML = `
            <h2>${country.name}</h2>
            <div class="clock-face" id="clock-${index}">
                <div class="hand hour" id="hour-${index}"></div>
                <div class="hand minute" id="minute-${index}"></div>
                <div class="hand second" id="second-${index}"></div>
            </div>
        `;

        clockContainer.appendChild(clockElement);

        updateClock(index, country.timezone); // Update the clock initially
        setInterval(() => updateClock(index, country.timezone), 1000); // Update every second
    });
}

// Function to update clock hands
function updateClock(index, timezone) {
    const now = new Date();
    const localTime = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
    const seconds = localTime.getSeconds();
    const minutes = localTime.getMinutes();
    const hours = localTime.getHours();

    const secondHand = document.getElementById(`second-${index}`);
    const minuteHand = document.getElementById(`minute-${index}`);
    const hourHand = document.getElementById(`hour-${index}`);

    const secondDegrees = ((seconds / 60) * 360) + 90;
    const minuteDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
    const hourDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;

    secondHand.style.transform = `rotate(${secondDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

// Filter clocks based on search
searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase();
    Array.from(document.querySelectorAll('.clock h2')).forEach(clockTitle => {
        const clockDiv = clockTitle.parentElement;
        clockDiv.style.display = clockTitle.textContent.toLowerCase().includes(query) ? 'block' : 'none';
    });
});

// Initialize the clocks
createClocks();
