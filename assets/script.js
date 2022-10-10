const APIkey = "f792ea86435d6d03093ac74cf0bb3026"
let searchInputEl = document.getElementById("input");
let formTag = document.getElementById('form-test');
let searchHistory = document.getElementById('search-history')
let cityName = document.getElementById('city')
let fiveDayEl = document.getElementById('fiveDayCards')

//City Display Elements
let currentTempEl = document.getElementById('temperature')
let currentCityEl = document.getElementById('city')
let currentWindSpeedEl = document.getElementById('wind-speed')
let currentHumidityEl = document.getElementById('humid')

// Current Conditions of City
function currentWeather(event) {
    event.preventDefault();
    var cityURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInputEl.value + "&appid=" + APIkey + "&units=imperial"

    fetch(cityURL)
        .then((response) => response.json())
        .then((data) => {

            //Get Informational Data
            // const lat = data.coord.lat;
            // const lon = data.coord.lon;
            const place = data.name;
            const temp = data.main.temp;
            const wind = data.wind.speed;
            const humidity = data.main.humidity;
            var today = moment().format('l');

            //REVIEW ICON CODE
            // let iconEl = document.createElement('img');
            // let iconData = data.weather[0].icon
            // iconEl.setAttribute('src', 'http://openweathermap.org/img/wn/' + iconData + ".png");
            // currentCityEl.append(iconEl);

            //Appends variables into HTML
            currentCityEl.textContent = place + ' ' + today;
            currentTempEl.textContent = 'Temp: ' + temp + ' °F';
            currentWindSpeedEl.textContent = 'Wind: ' + wind + 'MPH';
            currentHumidityEl.textContent = 'Humidity: ' + humidity + "%";
        });
}

//Displaying 5 Days of Projected Weather Data
function fiveDay(event) {
    event.preventDefault();
    console.log(searchInputEl.value);

    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInputEl.value + "&appid=" + APIkey + "&units=imperial"

    console.log(fiveDayURL);

    fiveDayEl.textContent = '5 Day Forecast: ';

    fetch(fiveDayURL)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            for (let i = 1; i <= 5; i++){
                
            }



        });
}

formTag.addEventListener('submit', currentWeather);
formTag.addEventListener('submit', fiveDay);