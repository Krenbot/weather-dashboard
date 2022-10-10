const APIkey = "f792ea86435d6d03093ac74cf0bb3026"
let searchInputEl = document.getElementById("input");
let formTag = document.getElementById('form-test');
let searchHistory = document.getElementById('search-history')

//City Display Elements
let currentTempEl = document.getElementById('temperature')
let currentCityEl = document.getElementById('city')
let currentWindSpeedEl = document.getElementById('wind-speed')
let currentHumidityEl = document.getElementById('humid')

// Finding & Displaying weather for search city
function citySearch(event) {
    event.preventDefault();
    // console.log(searchInputEl.value);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInputEl.value + "&appid=" + APIkey + "&units=imperial"
    //console.log(queryURL)

    fetch(queryURL)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            //Get lat/longitude data
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            console.log(lat)
            console.log(lon)

            const {temp} = data.main
            const place = data.name
            const {description, icon} = data.weather[0]
            console.log(temp)
            console.log(place)
            console.log(description)
            console.log(icon)
        });
}

function currentWeather() {

}


//Displaying 5 Days of Projected Weather Data
function fiveDay() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + lat + "&lon=" + "&units=imperial&cnt=6&appid=" + APIkey)
}

formTag.addEventListener('submit', citySearch);