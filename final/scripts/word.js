const wordUrl = "https://random-word-api.herokuapp.com/word?number=1";

export async function fetchWordOfTheDay() {
    try {
        const response = await fetch(wordUrl);
        const data = await response.json();

        const word = data[0];

        const wordElement = document.getElementById("word");
        const defElement = document.getElementById("definition");
        const posElement = document.getElementById("part-of-speech");

        wordElement.textContent = word;

        const dictResponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

        if (!dictResponse.ok) {
            defElement.textContent = "Definition not found.";
            posElement.textContent = "-";
            return;
        }

        const dictData = await dictResponse.json();

        const meaning = dictData[0]?.meanings[0];
        const definition = meaning?.definitions[0]?.definition || "No definition found.";
        const partOfSpeech = meaning?.partOfSpeech || "N/A";

        const pronunciation = dictData[0]?.phonetics[0]?.text || "";
        
        //Display definition and part of speech
        defElement.textContent = definition;
        posElement.textContent = `${partOfSpeech} ${pronunciation}`.trim();

        //Handle the audio pronunciation
        const audioElement = document.getElementById("pronunciation-audio");
        const playButton = document.getElementById("play-audio");

        const audioUrl = dictData[0]?.phonetics.find(p => p.audio)?.audio || "";

        if (audioUrl) {
            audioElement.src = audioUrl;
            playButton.style.display = "inline-block";
        } else {
            audioElement.removeAttribute("src");
            playButton.style.display = "none";
        }

        playButton.addEventListener("click", () => {
            audioElement.play();
        });

    } catch (error) {
        console.error("Word API error:", error);
        document.getElementById("word").textContent = "Error loading word";
        document.getElementById("definition").textContent = "Error loading definition";
        document.getElementById("part-of-speech").textContent = "N/A";
    }
}
