//Random scripture module

const scriptureUrl = "https://book-of-mormon-api.vercel.app/random";

//Main function to fetch and display a random scripture
export async function fetchScripture() {
    try {
        //fetch a scripture verse from the API
        const response = await fetch(scriptureUrl);
        const data = await response.json();

        //clean and extract scripture data
        const scriptureText = data.text.trim();
        const reference = data.reference;

        //display the scripture and its reference in the designated container
        document.getElementById("scripture").textContent = `"${scriptureText}" - ${reference}`;

    } catch (error) {
        console.error("Error fetching scripture:", error);
        document.getElementById("scripture").textContent = "Unable to load scripture."
    }
}
