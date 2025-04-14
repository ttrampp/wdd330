//Learn a word module

const wordUrl = "https://random-word-api.herokuapp.com/word?number=1";

export async function fetchNewWord() {

    //show a loading message before the word is fetched
    word.textContent = "Loading Word...";

    const wordElement = document.getElementById("word");
    const defElement = document.getElementById("definition");
    const posElement = document.getElementById("part-of-speech");
    const audioElement = document.getElementById("pronunciation-audio");
    const playButton = document.getElementById("play-audio");
    
    //hide play button by default in case no pronunciation is avaiable
    playButton.style.display = "none";

    let validWordFound = false;
    let attemptCount = 0;
    const maxAttempts = 50;     //prevent infinite loop on failed lookups

    try {
        //try up to maxAttempts to get a valid word with definition
        while (!validWordFound) {
            attemptCount++;
            if (attemptCount > maxAttempts) {
                throw new Error("Too many failed attempts to get a valid word.")
            }

            //step 1--get a random word
            const response = await fetch(wordUrl);
            const data = await response.json();
            const word = data[0];

            //step 2--try to look it up in dictionaryAPI
            const dictResponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            if (!dictResponse.ok) continue;

            const dictData = await dictResponse.json();
            const meaning = dictData[0]?.meanings[0];

            //if it doesn't have a definition, try again
            if (!meaning || !meaning.definitions[0]?.definition) continue;

            //valid word found
            validWordFound = true;

            const definition = meaning.definitions[0].definition;
            const partOfSpeech = meaning.partOfSpeech || "N/A";
            const pronunciation = dictData[0]?.phonetics[0]?.text || "";
            const audioUrl = dictData[0]?.phonetics?.find(p => p.audio)?.audio || "";

            //display word data in the DOM
            wordElement.textContent = word;
            defElement.textContent = definition;
            posElement.textContent = `${partOfSpeech} ${pronunciation}`.trim();
            
            //if audio is available, set it and show the play button
            if (audioUrl) {
                audioElement.src = audioUrl;
                playButton.style.display = "inline-block";
                playButton.onclick = () => audioElement.play();
            } else {
                audioElement.removeAttribute("src");
                
            }
        }

        //fallback error if no valid word found
        if (!validWordFound) {
            throw new Error("No valid word after multiple attempts.");
        }
    
    } catch (error) {
        console.error("Word API error:", error);
        wordElement.textContent = "Error loading word";
        defElement.textContent = "Error loading definition";
        posElement.textContent = "N/A";
        audioElement.removeAttribute("src");
        playButton.style.display = "none";
    }
}
