// Get references to HTML elements
const countdownDisplay = document.getElementById("countdown");
const startButton = document.getElementById("startButton");

let countdownValue = 10; // Starting time in seconds
let intervalId; // To store setInterval reference

// Function to start the countdown
function startCountdown() {
    if (intervalId) return; // Prevent multiple countdowns from starting

    countdownDisplay.textContent = countdownValue;
    startButton.disabled = true; // Disable button during countdown

    intervalId = setInterval(() => {
        countdownValue--;
        countdownDisplay.textContent = countdownValue;

        if (countdownValue <= 0) {
            clearInterval(intervalId); // Stop interval
            setTimeout(() => {
                countdownDisplay.textContent = "Time's up!";
                startButton.disabled = false; // Re-enable button
                countdownValue = 10; // Reset countdown for next use
                intervalId = null; // Reset interval reference
            }, 500); // Ensures smoother transistion with a 0.5s delay
        }
    }, 1000);
}

// Add event listener to start button
startButton.addEventListener("click", startCountdown);
