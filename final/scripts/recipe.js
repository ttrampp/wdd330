const recipeUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

async function fetchRecipe() {
    try {
        const response = await fetch(recipeUrl);
        const data = await response.json();
        const meal = data.meals[0];

        const recipeContainer = document.getElementById("recipe");
        const sourceLink = meal.strSource || meal.strYoutube || null;
        recipeContainer.innerHTML = `
            <h3>${meal.strMeal}</h3>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="250">
            <p><strong>Category:</strong> ${meal.strCategory}</p>
            <p><strong>Instructions:</strong> ${meal.strInstructions.slice(0, 300)}...</p>
            ${
                sourceLink
                ? `<p><a href=${sourceLink}" target="_blank" rel="noopener noreferrer">🍳View Full Recipe</a></p>`
                : `<p><em>No external recipe link available.</em></p>`
            }
            
        `;

    } catch (error) {
        console.error("Error fetching recipe:", error);
        document.getElementById("recipe").textContent = "Unable to load recipe."
    }
}

fetchRecipe();