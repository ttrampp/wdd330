function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById("location").innerText = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    document.getElementById("location").innerText = `Latitude: ${lat.toFixed(4)}, Longitude: ${lon.toFixed(4)}`;

    const map = document.getElementById("map");
    map.src = `https://maps.google.com/maps?q=${lat},${lon}&z=15&output=embed`;
}

function showError(error) {
    let message =  "An error has occurred.";
    switch(error.code) {
        case error.PERMISSION_DENIED:
            message = "Permission denied for geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            message = "Position unavailable.";
            break;
        case error.TIMEOUT:
            message = "Request timed out.";
            break;
        case error.UNKNOWN_ERROR:
            message = "An unknown error occurred.";
            break;
    }
    
    document.getElementById("location").innerText = message;
}

const canvas = document.getElementById("faceCanvas");
const context = canvas.getContext("2d");
let isHappy = true;

function drawFace(happy) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    //head
    context.beginPath();
    context.arc(100, 100, 80, 0, Math.PI * 2);
    context.stroke();

    //eyes
    context.beginPath();
    context.arc(70, 80, 10, 0, Math.PI * 2);
    context.arc(130, 80, 10, 0, Math.PI * 2);
    context.fill();

    //mouth
    context.beginPath();
    if (happy) {
        context.arc(100, 120, 40, 0, Math.PI, false);
    } else {
        context.arc(100, 130, 40, 0, Math.PI, true);
    }
    
    context.stroke();
}

canvas.addEventListener('click', () => {
    isHappy = !isHappy;
    drawFace(isHappy);
});

drawFace(isHappy);