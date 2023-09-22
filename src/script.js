const API_KEY = 'e0c1662d05cb6a4b82615c353c005319';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const WeatherContainer = document.getElementById('WeatherContainer');

getWeatherBtn.addEventListener('click', handleLocation)
locationInput.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
        handleLocation();
    }
})

function handleLocation(){
    const location = locationInput.value.trim();
    if (location) {
        // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
        const apiUrl = `${API_BASE_URL}?q=${location}&appid=${API_KEY}`;
        fetch(apiUrl)
            .then(res => res.json())
            .then((data) => {  //.then(({main}) => {  == берем отдельные поля
                console.log(data);
                displayWeather(data);
            })
            .catch(error => {
                console.log(error);
                WeatherContainer.innerHTML = 'Failed to fetch weather data';
            })
    }
    locationInput.value = '';
}

function displayWeather(weatherData){
    console.log(weatherData);
    //диструктуризация из данных
    const {name, sys:{country}, main, main:{humidity}, weather, wind:{speed}, visibility} = weatherData;

    // const country = sys.country;
    const temperatureC = Math.floor(main.temp - 273.15);
    const temperatureMaxC = Math.floor(main.temp_max - 273.15);
    const temperatureMinC = Math.floor(main.temp_min - 273.15);
    const weatherMain = weather[0].main;
    const weatherDescription = weather[0].main;
    // const humidity = main.humidity;
    // const windSpeed = wind.speed;
    const visibilityDist = visibility / 1000;
    const weatherCard = document.createElement('div');
    weatherCard.classList.add('weather-card');

    WeatherContainer.innerHTML = '';

    weatherCard.innerHTML = `
        <h2>${name}, ${country}</h2>
        <p>Temperature: ${temperatureC} </p>
        <p>Temperature min: ${temperatureMinC} </p>
        <p>Temperature max: ${temperatureMaxC} </p>
        <p>Weather: ${weatherMain} </p>
        <p>Description: ${weatherDescription} </p>
        <p>Humidity: ${humidity} </p>
        <p>Wind Speed: ${speed} </p>
        <p>Visibility: ${visibilityDist} </p>
    `;
    WeatherContainer.append(weatherCard);
}
