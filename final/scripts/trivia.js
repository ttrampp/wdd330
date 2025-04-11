const triviaUrl = "https://opentdb.com/api.php?amount=1&type=multiple";

function decodeHTML(str) {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
}

export async function fetchTrivia() {
    try {
        const response = await fetch(triviaUrl);
        const data = await response.json();
        const trivia = data.results[0];

        const question = decodeHTML(trivia.question);
        const correct = decodeHTML(trivia.correct_answer);
        const incorrect = trivia.incorrect_answers.map(decodeHTML);

        //Shuffle answers
        const allAnswers = [...incorrect, correct].sort(() => Math.random() - 0.5);

        const triviaContainer = document.getElementById("trivia");
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
                if (button.textContent === correct) {
                    alert("Correct!");
                } else {
                    alert(`Nope! The Correct answer is: ${correct}`);
                }
            });
        });


    } catch (error) {
        console.error("Error fetching trivia:", error);
        document.getElementById("trivia").textContent = "Unable to load trivia."
    }
}
