const triviaUrl = "https://opentdb.com/api.php?amount=1&type=multiple";

let correctCount = 0;
let totalCount = 0;

function decodeHTML(str) {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
}

export async function fetchTrivia(difficulty = "") {
    const url = difficulty ? `${triviaUrl}&difficulty=${difficulty}` : triviaUrl;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const trivia = data.results[0];

        const question = decodeHTML(trivia.question);
        const correct = decodeHTML(trivia.correct_answer);
        const incorrect = trivia.incorrect_answers.map(decodeHTML);

        const newTriviaBtn = document.getElementById("new-trivia");
        if (newTriviaBtn) {
            newTriviaBtn.textContent = "Get New Question"       //Change button text after first question
        }

        //Shuffle answers
        const allAnswers = [...incorrect, correct].sort(() => Math.random() - 0.5);

        const triviaContainer = document.getElementById("trivia");
        triviaContainer.innerHTML = "";
        triviaContainer.innerHTML = `
            <h3>${question}</h3>
            <ul>
                ${allAnswers.map(ans => `<li><button class="answer">${ans}</button></li>`).join("")}
            </ul>
        `;

        //Add answer-checking
        const buttons = document.querySelectorAll(".answer");
        buttons.forEach(button => {
            button.addEventListener("click", () => {
                totalCount++;

                if (button.textContent === correct) {
                    correctCount++;
                    alert("Correct!");
                } else {
                    alert(`Nope! The Correct answer is: ${correct}`);
                }

                const triviaContainer = document.getElementById("trivia");
                triviaContainer.insertAdjacentHTML("beforeend", `
                    <p><strong>Score:</strong> ${correctCount} / ${totalCount}</p>
                `);

                buttons.forEach(btn => btn.disabled = true);
            });
        });


    } catch (error) {
        console.error("Error fetching trivia:", error);
        document.getElementById("trivia").textContent = "Unable to load trivia."
    }
}
