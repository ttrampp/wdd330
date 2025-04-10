//background image list
const backgrounds = [
    "images/pic01.jpeg",
    "images/pic02.jpeg",
    "images/pic03.jpg",
    "images/pic04.jpg",
    "images/pic05.jpg",
    "images/pic06.jpg",
    "images/pic07.jpg",
    "images/pic08.jpg"
]

//apply saved background when page loads
function applySavedBackground() {
    const savedBg = localStorage.getItem("backgroundImage");
    if (savedBg) {
        document.body.style.backgroundImage = `url(${savedBg})`;
    }
}

//add event listeners to thumbnail images
function initBackgroundSelector() {
    const container = document.querySelector(".background-options");
    container.innerHTML = "";

    backgrounds.forEach((src, index) => {
        const img =document.createElement("img");
        img.src = src;
        img.alt = `Background ${index + 1}`;
        img.classList.add("bg-thumbnail");

        img.addEventListener("click", () => {
            const selectedImage = img.getAttribute("src");
            document.body.style.backgroundImage = `url(${src})`;
            localStorage.setItem("backgroundImage", src);
        });

        container.appendChild(img);
    });

    //check to see if custom background was saved
    const savedCustom = localStorage.getItem("backgroundImage");
    const uploaded =  localStorage.getItem("customBackgroundUpload");

    if (savedCustom && uploaded === "true") {
        const img = document.createElement("img");
        img.src = savedCustom;
        img.alt = "Uploaded Background";
        img.classList.add("bg-thumbnail");

        img.addEventListener("click", () => {
            document.body.style.backgroundImage = `url(${savedCustom})`;
            localStorage.setItem("backgroundImage", savedCustom);
        });

        container.appendChild(img);
    }
}

//reset background to default
function initBackgroundReset() {
    const resetBtn = document.getElementById("reset-bg");
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            document.body.style.backgroundImage = "";
            localStorage.removeItem("backgroundImage");
            localStorage.removeItem("customBackgroundUpload");
        });
    }
}

function initCustomBackgroundUpload() {
    const uploadInput = document.getElementById("upload-bg");
    const message = document.getElementById("upload-message");

    uploadInput.addEventListener("change", () => {
        const file = uploadInput.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            const imageData = e.target.result;

            //apply the image and save it
            document.body.style.backgroundImage = `url(${imageData})`;
            localStorage.setItem("backgroundImage", imageData);
            localStorage.setItem("customBackgroundUpload", "true");

            //show success message
            message.style.display = "block";

            //add thumbnail to modal
            const container = document.querySelector(".background-options");

            const img = document.createElement("img");
            img.src = imageData;
            img.alt = "Uploaded Background";
            img.classList.add("bg-thumbnail");

            img.addEventListener("click", () => {
                document.body.style.backgroundImage = `url(${imageData})`;
                localStorage.setItem("backgroundImage", imageData);
            });

            container.appendChild(img);
        };

        reader.readAsDataURL(file);         //Converts image to base64 string so it can display instantly and store in localStorage
    })
}

//intialize-call everything
applySavedBackground();
initBackgroundSelector();
initBackgroundReset();
initCustomBackgroundUpload();