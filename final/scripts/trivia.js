//trivia game module

const triviaUrl = "https://opentdb.com/api.php?amount=1&type=multiple";

let correctCount = 0;
let totalCount = 0;


//decode html entities from API response
function decodeHTML(str) {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
}

//fetch and display a trivia question with optional difficulty level
export async function fetchTrivia(difficulty = "") {
    const url = difficulty ? `${triviaUrl}&difficulty=${difficulty}` : triviaUrl;

    try {
        const response = await fetch(url);          //fetch trivia question
        const data = await response.json();
        const trivia = data.results[0];

        const question = decodeHTML(trivia.question);       //decode the question text
        const correct = decodeHTML(trivia.correct_answer);  //decode the question answer
        const incorrect = trivia.incorrect_answers.map(decodeHTML);     //decode all incorrect answers

        //update button label after first question
        const newTriviaBtn = document.getElementById("new-trivia");
        if (newTriviaBtn) {
            newTriviaBtn.textContent = "Get New Question"       //Change button text after first question
        }

        //Combine correct and incorrect answers and shuffle cards
        const allAnswers = [...incorrect, correct].sort(() => Math.random() - 0.5);

        const triviaContainer = document.getElementById("trivia");
        triviaContainer.innerHTML = "";                 //clear previous content
        triviaContainer.innerHTML = `
            <h3>${question}</h3>
            <ul>
                ${allAnswers.map(ans => `<li><button class="answer">${ans}</button></li>`).join("")}
            </ul>
        `;

        //Add answer-checking and score tracking
        const buttons = document.querySelectorAll(".answer");
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                totalCount++;       //increment total number of answered questions

                if (button.textContent === correct) {
                    correctCount++;     //increment score if correct
                    alert("Correct!");
                } else {
                    alert(`Nope! The Correct answer is: ${correct}`);
                }

                const triviaContainer = document.getElementById("trivia");

                //display updated score below the question
                triviaContainer.insertAdjacentHTML("beforeend", `
                    <p><strong>Score:</strong> ${correctCount} / ${totalCount}</p>
                `);

                //disable all buttons after answering
                buttons.forEach(btn => btn.disabled = true);
            });
        });


    } catch (error) {
        console.error("Error fetching trivia:", error);     //log errors
        document.getElementById("trivia").textContent = "Unable to load trivia."
    }
}
