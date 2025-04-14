//NPR News fetch module

//API endpoint using NPR's RSS feed
const newsUrl = "https://api.rss2json.com/v1/api.json?rss_url=https://www.npr.org/rss/rss.php?id=1001";

//Main function to fetch display news headlines
export async function fetchNews() {
    try {
        const response = await fetch(newsUrl);
        const data = await response.json();

        //get the container where news will be displayed
        const newsContainer = document.getElementById("news");
        newsContainer.innerHTML = "";

        //extract 5 articles from the feed
        const articles = data.items.slice(0, 5);        //Show tope 5 headlines

        //create and append each news item to the container
        articles.forEach(article => {
            const item = document.createElement("div");
            item.classList.add("news-item");
            item.innerHTML = `
                <h4><a href="${article.link}" target="_blank">${article.title}</a> </h4>
                <p>${article.pubDate}</p>
            `;
            newsContainer.appendChild(item);
        });
    } catch (error) {
        console.error("Error fetching news:", error);
        document.getElementById("news").textContent = "Unable to load news."
    }
}
