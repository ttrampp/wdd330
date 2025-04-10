import "./weather.js";
import "./word.js";
import "./scripture.js";
import "./news.js";
import "./recipe.js";
import "./trivia.js";
import "./memoryGame.js";
import "./background.js";

/*WEATHER API*/
function initWeatherModal() {
    document.getElementById("weather-btn").addEventListener("click", () => {
        document.getElementById("weather-modal").style.display = "block";
    });
}


/*WORD API*/
/*function initWordModal() {
    document.getElementById("word-btn").addEventListener("click", () => {
        document.getElementById("word-modal").style.display = "block";
    });
}*/

/*SCRIPTURE API*/
/*function initScriptureModal() {
    document.getElementById("scripture-btn").addEventListener("click", () => {
        document.getElementById("scripture-modal").style.display = "block";
    });
}*/

/*NEWS API*/
/*function initNewsModal() {
    document.getElementById("news-btn").addEventListener("click", () => {
        document.getElementById("news-modal").style.display = "block";
    });
}*/

/*RECIPE API*/
/*function initRecipeModal() {
    document.getElementById("recipe-btn").addEventListener("click", () => {
        document.getElementById("recipe-modal").style.display = "block";
    });
}*/

/*TRIVIA API*/
/*function initTriviaModal() {
    document.getElementById("trivia-btn").addEventListener("click", () => {
        document.getElementById("trivia-modal").style.display = "block";
    });
}*/

/*MEMORY MATCHING API*/
/*function initMemoryModal() {
    document.getElementById("memory-btn").addEventListener("click", () => {
        document.getElementById("memory-modal").style.display = "block";
        startGame();
    });
}*/

/*BACKGROUND SELECTOR*/
/*function initBackgroundModal() {
    document.getElementById("background-btn").addEventListener("click", () => {
        document.getElementById("background-modal").style.display = "block";
    });
}*/

/*CLOSE MODAL BUTTON -- CLICKING ON X*/
function initModalCloseWithX() {
    document.querySelectorAll(".close-btn").forEach((btn) => {       /*grabs every button*/
        btn.addEventListener("click", (e) => {
            const modal = e.target.closest(".modal");               /*finds the parent modal*/
            if (modal) {
                modal.style.display = "none";                       /*modal is hidden*/

                const message = document.getElementById("upload-message");
                if (message) {
                    message.style.display = "none";
                }
            }
        });
    });
}

/*CLOSE MODAL -- CLICKING ON OUTSIDE OVERLAY*/
function initModalCloseOutside() {
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("modal")) {
            e.target.style.display = "none";
            
            const message = document.getElementById("upload-message");
            if (message) {
                message.style.display = "none";
            }
        }
    });
}

/*ADDED ANIMATION FOR MODAL BUTTONS FOR A STRETCH*/
/*CLONE THE ICON, ANIMATE IT, REMOVE IT AFTER IT ENDS, THEN SHOW MODAL*/
function animateButtonToCenter(buttonId, modalId) {
    const btn = document.getElementById(buttonId);
    const modal = document.getElementById(modalId);

    btn.addEventListener("click", () => {
        const rect = btn.getBoundingClientRect();

        //clone the button
        const clone = btn.cloneNode(true);
        clone.style.position = "absolute";
        clone.style.left = `${rect.left}px`;
        clone.style.top = `${rect.top}px`;
        clone.style.width = `${rect.width}px`;
        clone.style.height = `${rect.height}px`;

        clone.style.border = "2px solid red";


        //center of the button -- start
        const startX = rect.left + rect.width / 2;
        const startY = rect.top + rect.height / 2;

        //calculate center of the the screen -- end destination
        const endX = window.innerWidth / 2;
        const endY = window.innerHeight / 2;

        //how far to move
        const deltaX = endX - startX;
        const deltaY = endY - startY;

        //pass the delta values as css variables for animation
        clone.style.setProperty('--move-x', `${deltaX}px`);
        clone.style.setProperty('--move-y', `${deltaY}px`);

        console.log("Move X:", deltaX, "Move Y:", deltaY);


        //add class to trigger animation
        clone.classList.add("animate-fly-center");
        document.body.appendChild(clone);

        //after animation, remove clone and show modal
        clone.addEventListener("animationend", () => {
            clone.remove();
            modal.style.display = "block";

        });
    });
}


/*INITIALIZE-CALL EVERYTHING*/
/*initWeatherModal();
initWordModal();
initScriptureModal();
initNewsModal();
initRecipeModal();
initTriviaModal();
initMemoryModal();
initBackgroundModal();*/
initModalCloseWithX();
initModalCloseOutside();

animateButtonToCenter("weather-btn", "weather-modal");
animateButtonToCenter("word-btn", "word-modal");
animateButtonToCenter("scripture-btn", "scripture-modal");
animateButtonToCenter("news-btn", "news-modal");
animateButtonToCenter("recipe-btn", "recipe-modal");
animateButtonToCenter("trivia-btn", "trivia-modal");
animateButtonToCenter("memory-btn", "memory-modal");
animateButtonToCenter("background-btn", "background-modal");
