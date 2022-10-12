const APIkey = "f792ea86435d6d03093ac74cf0bb3026";
let formTagEl = document.getElementById('form-test');
let searchHistoryEl = document.getElementById('search-history');
let cityNameEl = document.getElementById('city');

//City Display Elements
let currentTempEl = document.getElementById('temperature');
let currentCityEl = document.getElementById('city');
let currentWindSpeedEl = document.getElementById('wind-speed');
let currentHumidityEl = document.getElementById('humid');
let searchInputEl = document.getElementById("input");
let fiveDayEl = document.getElementById('fiveDayForecast');

// Current Conditions of City
function currentWeather(event) {
    event.preventDefault();
    var cityURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInputEl.value + "&appid=" + APIkey + "&units=imperial"

    fetch(cityURL)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)

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

    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInputEl.value + "&appid=" + APIkey + "&units=imperial"
    console.log(fiveDayURL)

    fetch(fiveDayURL)
        .then((response) => response.json())
        .then((data2) => {
            console.log(data2)

            //Per API settings, gets data for next 5 days
            for (let i = 3; i <= data2.list.length; i += 9) {

                const place = data2.name;
                const temp = data2.list[i].main.temp;
                const wind = data2.list[i].wind.speed;
                const humidity = data2.list[i].main.humidity;
                var today = moment().format('l');

                currentCityEl.textContent = place + ' ' + today;
                currentTempEl.textContent = 'Temp: ' + temp + ' °F';
                currentWindSpeedEl.textContent = 'Wind: ' + wind + 'MPH';
                currentHumidityEl.textContent = 'Humidity: ' + humidity + "%";

                for (let i = 1; i < 6; i++) {

                }
                // REFERENCE HTML
                // <!-- Show 5 Day Results -->
                // <section id='fiveDayForecast' class="col-12 col-md-10">
                // <div class="row justify-content-evenly five-day">
                // <h3>Five Day Forecast:</h3>
                //<!-- <div id='day-1' class='card mb-3 col-3 col-sm-2'>TEST DAY 1</div>
                //<div id='day-2' class='card mb-3 col-3 col-sm-2'>TEST DAY 2</div>
                //<div id='day-3' class='card mb-3 col-3 col-sm-2'>TEST DAY 3</div>
                //<div id='day-4' class='card mb-3 col-3 col-sm-2'>TEST DAY 4</div>
                //<div id='day-5' class='card mb-3 col-3 col-sm-2'>TEST DAY 5</div> -->
                //</div>
                // </section>
            }
        });
}

formTagEl.addEventListener('submit', currentWeather);
// formTagEl.addEventListener('submit', fiveDay);