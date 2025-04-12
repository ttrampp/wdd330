import {fetchWeather} from "./weather.js";
import {fetchWordOfTheDay} from "./word.js";
import {fetchScripture} from "./scripture.js";
import {fetchNews} from "./news.js";
import {fetchRecipe} from "./recipe.js";
import {fetchTrivia} from "./trivia.js";
import {startGame} from "./memoryGame.js";
import "./background.js";


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
function animateButtonToCenter(buttonId, modalId, callback) {
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
            if (typeof callback === "function") {
                callback();             //API call happens here
            }
        });
    });
}

initModalCloseWithX();
initModalCloseOutside();

animateButtonToCenter("weather-btn", "weather-modal", fetchWeather);
animateButtonToCenter("word-btn", "word-modal", fetchWordOfTheDay);
animateButtonToCenter("scripture-btn", "scripture-modal", fetchScripture);
animateButtonToCenter("news-btn", "news-modal", fetchNews);
animateButtonToCenter("recipe-btn", "recipe-modal", fetchRecipe);
animateButtonToCenter("trivia-btn", "trivia-modal", () => {
    fetchTrivia();    
    const triviaBtn = document.getElementById("new-trivia");
    if (triviaBtn) {
        triviaBtn.addEventListener("click", fetchTrivia);
    }
}); //for get new question in Trivia Game

animateButtonToCenter("memory-btn", "memory-modal", startGame);
animateButtonToCenter("background-btn", "background-modal");



