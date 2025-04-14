const wordUrl = "https://random-word-api.herokuapp.com/word?number=1";

export async function fetchWordOfTheDay() {

    word.textContent = "Loading Word...";

    const wordElement = document.getElementById("word");
    const defElement = document.getElementById("definition");
    const posElement = document.getElementById("part-of-speech");
    const audioElement = document.getElementById("pronunciation-audio");
    const playButton = document.getElementById("play-audio");
    
    playButton.style.display = "none";

    let validWordFound = false;
    let attemptCount = 0;
    const maxAttempts = 50;

    try {
        while (!validWordFound) {
            attemptCount++;
            if (attemptCount > maxAttempts) {
                throw new Error("Too many failed attempts to get a valid word.")
            }

            const response = await fetch(wordUrl);
            const data = await response.json();
            const word = data[0];

            const dictResponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            if (!dictResponse.ok) continue;

            const dictData = await dictResponse.json();
            const meaning = dictData[0]?.meanings[0];

            if (!meaning || !meaning.definitions[0]?.definition) continue;

            //valid word found
            validWordFound = true;

            const definition = meaning.definitions[0].definition;
            const partOfSpeech = meaning.partOfSpeech || "N/A";
            const pronunciation = dictData[0]?.phonetics[0]?.text || "";
            const audioUrl = dictData[0]?.phonetics?.find(p => p.audio)?.audio || "";

            wordElement.textContent = word;

            defElement.textContent = definition;
            posElement.textContent = `${partOfSpeech} ${pronunciation}`.trim();
            
            if (audioUrl) {
                audioElement.src = audioUrl;
                playButton.style.display = "inline-block";
                playButton.onclick = () => audioElement.play();
            } else {
                audioElement.removeAttribute("src");
                
            }
        }

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
