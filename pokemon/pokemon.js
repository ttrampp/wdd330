// fetch-example.js

//const url = "https://pokeapi.co/api/v2/pokemon/ditto";
const url = "https://pokeapi.co/api/v2/pokemon?limit=2000";

let results = null;

async function getPokemon(url) {
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        console.log("Total Pokemon count: ", data.count);
        results = data;
        populateSelect(data.results);
    }
}

function populateSelect(pokemonList) {
    const selectElement = document.getElementById("pokemonSelect");
    selectElement.innerHTML = ""; // Clear existing options
    
    pokemonList.forEach(pokemon => {
        const option = document.createElement("option");
        option.value = pokemon.name;
        option.textContent = pokemon.name;
        selectElement.appendChild(option);
    });
}

getPokemon(url);
