//Display the current year in the footer
export function setupFooterAndNavbar() {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;

    document.addEventListener('DOMContentLoaded', () => {
        const lastModifiedElement = document.getElementById("date-modified");
        if (lastModifiedElement) {
            lastModifiedElement.textContent = document.lastModified;
        }
    });
}

//module imports

//imports api functions and background logic for each modal
import {fetchWeather} from "./weather.js";
import {fetchNewWord} from "./word.js";
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

                //hide upload message when closing
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

//initialize modal logic
initModalCloseWithX();
initModalCloseOutside();

//attach modal triggers with animations and callbacks for API calls
animateButtonToCenter("weather-btn", "weather-modal", fetchWeather);
animateButtonToCenter("word-btn", "word-modal", fetchNewWord);
animateButtonToCenter("scripture-btn", "scripture-modal", fetchScripture);
animateButtonToCenter("news-btn", "news-modal", fetchNews);
animateButtonToCenter("recipe-btn", "recipe-modal", fetchRecipe);

//special handling for trivia game--difficulty selection logic
animateButtonToCenter("trivia-btn", "trivia-modal", () => {   
    const triviaBtn = document.getElementById("new-trivia");
    if (triviaBtn) {
        triviaBtn.textContent = "Begin";

        //replace old click handlers to prevent duplicate bindings
        triviaBtn.replaceWith(triviaBtn.cloneNode(true));
        const newBtn = document.getElementById("new-trivia");

        newBtn.addEventListener("click", () => {
            const difficulty = document.getElementById("trivia-difficulty").value;
            fetchTrivia(difficulty)
        });
    }
});

animateButtonToCenter("memory-btn", "memory-modal", startGame);
animateButtonToCenter("background-btn", "background-modal");



