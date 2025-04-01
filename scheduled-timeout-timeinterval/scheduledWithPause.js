// Get references to HTML elements
const countdownDisplay = document.getElementById("countdown");
const startButton = document.getElementById("startButton");
const pauseResumeButton = document.getElementById("pauseResumeButton");

let countdownValue = 10; // Starting time in seconds
let intervalId = null; // To store setInterval reference
let isPaused = false; // Track pause state

// Function to start the countdown
function startCountdown() {
    if (intervalId) return; // Prevent multiple countdowns from starting

    startButton.disabled = true;
    pauseResumeButton.disabled = false;
    pauseResumeButton.textContent = "Pause";

    intervalId = setInterval(() => {
        if (!isPaused) {
            countdownValue--;
            countdownDisplay.textContent = countdownValue;

            if (countdownValue <= 0) {
                clearInterval(intervalId); // Stop interval
                setTimeout(() => {
                    countdownDisplay.textContent = "Time's up!";
                    startButton.disabled = false;
                    pauseResumeButton.disabled = true;
                    countdownValue = 10; // Reset countdown for next use
                    intervalId = null; // Reset interval reference
                }, 500);
            }
        }
    }, 1000);
}

// Function to pause/resume countdown
function togglePauseResume() {
    if (intervalId) {
        isPaused = !isPaused;
        pauseResumeButton.textContent = isPaused ? "Resume" : "Pause";
    }
}

// Event listeners
startButton.addEventListener("click", startCountdown);
pauseResumeButton.addEventListener("click", togglePauseResume);
