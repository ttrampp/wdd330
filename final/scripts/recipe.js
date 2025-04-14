 //Random Recipe Module

 export async function fetchRecipe() {
    
    const recipeUrl = "https://www.themealdb.com/api/json/v1/1/random.php";
     
    try {
        //fetch a random recipe from the API
        const response = await fetch(recipeUrl);
        const data = await response.json();
        const meal = data.meals[0];

        //reference to the recipe display container in the DOM
        const recipeContainer = document.getElementById("recipe");

        //determine the best available source link--original or YouTube
        const sourceLink = meal.strSource || meal.strYoutube || null;

        //populate the container with recipe content
        recipeContainer.innerHTML = `
        <h3>${meal.strMeal}</h3>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="250">
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <p><strong>Instructions:</strong> ${meal.strInstructions.slice(0, 300)}...</p>
        ${
        sourceLink
        ? `<p><a href="${sourceLink}" target="_blank" rel="noopener noreferrer">🍳View Full Recipe</a></p>`
        : `<p><em>No external recipe link available.</em></p>`
        }
        
        `;
        
    } catch (error) {
        console.error("Error fetching recipe:", error);
        document.getElementById("recipe").textContent = "Unable to load recipe."
    }
}