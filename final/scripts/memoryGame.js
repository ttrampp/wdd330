const memoryUrl = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

//get a reference to the game board element in html
const board = document.getElementById("board");

//arrays track with cards are flipped and matched
let flippedCards = [];
let matchedCards = [];

//hide Play Again button at the start of a game
function hidePlayAgainButton() {
    const playAgainBtn = document.getElementById("play-again-btn");
    if (playAgainBtn) {
        playAgainBtn.style.display = "none";
    }
}

//function to start the game
export async function startGame() {
    try {

    hidePlayAgainButton();      //hides the button on every new game start

    //fetch a new shuffled deck of cards
    const deckRes = await fetch(memoryUrl)
    const deckData = await deckRes.json();

    //draw 6 cards from deck
    const drawRes = await fetch(`https://deckofcardsapi.com/api/deck/${deckData.deck_id}/draw/?count=6`);
    const drawData = await drawRes.json();
    //extract the cards array from the drawData
    const cards = drawData.cards;

    console.log("Deck data:", deckData);
    console.log("Draw data:", drawData);

    if (!drawData.cards) {
        throw new Error("No cards returned from API.");
    }

    //making a list of image objects for the cards
    const cardImages = cards.map(card => ({
        code: card.code,        //unique card code
        image: card.image       //URL to the card's face image
    }));

    //duplicate each card, so there are matching pairs
    const gameCards = [...cardImages, ...cardImages]    //duplicate the cards
        .map(card => ({ ...card, id: crypto.randomUUID() }))    //give each copy a unique ID
        .sort(() => Math.random() - 0.5);               //make the card order random

    //build the card board
    buildBoard(gameCards);

    //clear or update the loading message
    const memoryMsg = document.getElementById("memory");
    if (memoryMsg) {
        memoryMsg.textContent = "Flip two cards to find a match!";
    }

} catch (error) {
    console.error("Error in startGame():", error.message);
    document.getElementById("memory").textContent = "Something went wrong loading the cards.";
}}

//function to create and display the card elements on the board
function buildBoard(cards) {
    //clear any existing cards from the board
    board.innerHTML = "";

    //loop through the cards and create a clickable card element
    cards.forEach(card => {
        const cardDiv = document.createElement("div");
        cardDiv.className = "card";
        cardDiv.dataset.code = card.code;   //store the original card code for matching
        cardDiv.dataset.id = card.id;       //store the unique ID so cards two identical cards aren't matched with each other

        //set appearance as back of card
        cardDiv.style.backgroundImage = `url("https://deckofcardsapi.com/static/img/back.png")`;

        //add event listener for when the card is clicked on
        cardDiv.addEventListener("click", () => handleFlip(cardDiv, card.image));

        //add this card to the game board
        board.appendChild(cardDiv);
    });
}

//function to handle when a card gets flipped and check for a match
function handleFlip(cardBox, imageUrl) {
    //ignore if card is already flipped or if already checking 2 cards
    if (cardBox.classList.contains("flipped") || flippedCards.length >= 2) return;

    //flip the card visually
    cardBox.classList.add("flipped");
    cardBox.style.backgroundImage = `url(${imageUrl})`;

    //add to the flipped cards list
    flippedCards.push(cardBox);

    //if two cards are flipped, compare the two
    if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;

        if (card1.dataset.code === card2.dataset.code) {
            //they match, so store and continue
            matchedCards.push(card1.dataset.code);
            flippedCards = [];

            //check to see if the game has been won
            if (matchedCards.length === 6) {
                console.log("All matches found.")
                setTimeout(() => {
                    alert("🎉🎊FANTASTIC! YOU WON!🎊🎉");
                    showPlayAgainButton();
                }, 300);
            }

        } else {
            //they DO NOT match, so flip them back over after a short delay
            setTimeout(() => {
                flippedCards.forEach(card => {
                    card.classList.remove("flipped");
                    card.style.backgroundImage = `url("https://deckofcardsapi.com/static/img/back.png")`;
                });
                flippedCards = [];
            }, 800);
        }
    }
}

//show the play again button when the game is won
function showPlayAgainButton() {
    const playAgainBtn = document.getElementById("play-again-btn");
    if(playAgainBtn) {
        playAgainBtn.style.display = "inline-block";
        playAgainBtn.addEventListener("click", () => {
            //reset game state
            flippedCards = [];
            matchedCards = [];
            playAgainBtn.style.display = "none";
            startGame();    //start a new game
        });
    }
}