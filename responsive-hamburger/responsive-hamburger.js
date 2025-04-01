const hambutton = document.querySelector('.🍔');
const mainnav = document.querySelector('.navigation');
let alertTriggered = false; // Boolean flag to track if the alert has already been shown

hambutton.addEventListener('click', () => {
    mainnav.classList.toggle('responsive');
}, false);

// Handles the responsive class removal and displays a popup alert only once
window.addEventListener('resize', () => {
    if (window.innerWidth > 760) { 
        if (mainnav.classList.contains('responsive')) {
            mainnav.classList.remove('responsive');

            // Show the alert only once when resizing past 760px
            if (!alertTriggered) {
                window.alert("The responsive menu has been removed.");
                alertTriggered = true; // Prevents repeated alerts
            }
        }
    } else {
        // Reset flag when screen is below 760px to allow future alerts
        alertTriggered = false;
    }
});
