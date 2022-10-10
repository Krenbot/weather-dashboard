const APIkey = "f792ea86435d6d03093ac74cf0bb3026"
let searchInputEl = document.getElementById("input");
let formTag = document.getElementById('form-test');
let searchHistory = document.getElementById('search-history')
let cityName = document.getElementById('city')

//City Display Elements
let currentTempEl = document.getElementById('temperature')
let currentCityEl = document.getElementById('city')
let currentWindSpeedEl = document.getElementById('wind-speed')
let currentHumidityEl = document.getElementById('humid')

// Current Conditions of City
function currentWeather(event) {
    event.preventDefault();
    // console.log(searchInputEl.value);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInputEl.value + "&appid=" + APIkey + "&units=imperial"
    //console.log(queryURL)

    fetch(queryURL)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            //Get Informational Data
            const lat = data.coord.lat;
            const lon = data.coord.lon;
            const place = data.name
            const icon = data.weather[0].icon
            const temp = data.main.temp
            const wind = data.wind.speed
            const humidity = data.main.humidity
            var today = moment().format('l');
            
            //REVIEW ICON CODE
            // let iconEl = document.createElement('img')
            // let icon
            // + "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            
            //Appends variables into HTML
            currentCityEl.textContent = place + ' ' + today 
            currentTempEl.textContent = 'Temp: ' + temp + ' °F';
            currentWindSpeedEl.textContent = 'Wind: ' + wind + 'MPH';
            currentHumidityEl.textContent = 'Humidity: ' + humidity + "%";
        });
}
//Displaying 5 Days of Projected Weather Data
function fiveDay() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + lat + "&lon=" + "&units=imperial&cnt=6&appid=" + APIkey)
}

formTag.addEventListener('submit', currentWeather);