const scriptureUrl = "https://book-of-mormon-api.vercel.app/random";


async function fetchScripture() {
    try {
        const response = await fetch(scriptureUrl);
        const data = await response.json();

        const scriptureText = data.text.trim();
        const reference = data.reference;

        document.getElementById("scripture").textContent = `"${scriptureText}" - ${reference}`;

    } catch (error) {
        console.error("Error fetching scripture:", error);
        document.getElementById("scripture").textContent = "Unable to load scripture."
    }
}

fetchScripture();