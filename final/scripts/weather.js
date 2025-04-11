// index weather api
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const extras = document.getElementById("weather-extra")

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=36.75082&lon=-108.36565&units=imperial&appid=f63f3c9b0e500e13346f9e9a881a061a';

export async function fetchWeather() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        }
        else {
            throw Error(await response.text());
        }
    }
    catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    weatherIcon.setAttribute('loading', 'lazy');
    captionDesc.textContent = `${desc}`;

    //extra weather info
    const feelsLike = `${data.main.feels_like}°F`;
    const tempMin = `${data.main.temp_min}°F`;
    const tempMax = `${data.main.temp_max}°F`;
    const humidity = `${data.main.humidity}°%`;
    const pressure = `${data.main.pressure} hPa`;
    const windSpeed = `${data.wind.speed} mph`;
    const windDir = `${data.wind.deg}°`;
    const windGust = data.wind.gust ? `${data.wind.gust} mph` : "N/A";
    const cloudiness = `${data.clouds.all}%`;
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

    //add content to extras section
    if (extras) {
        extras.innerHTML = `
            <br>
            <p><strong>Feels like:</strong> ${feelsLike}</p>
            <p><strong>High:</strong> ${tempMax} | <strong>Low:</strong> ${tempMin}</p>
            <p><strong>Humidity:</strong> ${humidity} | <strong>Pressure:</strong> ${pressure}</p>
            <p><strong>Wind:</strong> ${windSpeed} | <strong>WindDir:</strong> ${windDir} (Gusts: ${windGust})</p>
            <p><strong>Cloudiness:</strong> ${cloudiness}</p>
            <p><strong>Sunrise:</strong> ${sunrise} | <strong>Sunset:</strong> ${sunset}</p>
            <br>
            <br>
            <p><strong>Atmospheric Pressure Guide:</strong></p>
            <p><1000 hPa        =       Low pressure(often rainy/stormy)</p>
            <p>1010-1020 hPa    =       Normal/average sea-level pressure</p>
            <p>>1020 hPa        =       High Pressure (usually calm, clear)</p>
        `;
    }
}
