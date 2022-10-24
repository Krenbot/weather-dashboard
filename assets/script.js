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
let fiveDayEl = document.querySelector('.five-day');
let singleDayIcon = document.getElementById('single-day-icon');


//Save Searches to Local Storage
var pastSearch = json.parse(localStorage.getItem('pastSearch')) || [];

//Store Searched City and Create a Clickable Button
function storeSearch(cityName) {
    var pastSearchBtn = document.createElement('button');
    pastSearchBtn.setAttribute('class', 'button');
    pastSearchBtn.innerText = cityName;
    searchHistoryEl.appendChild(pastSearchBtn);

    pastSearchBtn.addEventListener('click', function () {
        cityName = pastSearchBtn.innerText;
    }
}



// Current Conditions of City
function currentWeather(event) {
    event.preventDefault();
    var cityURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInputEl.value + "&appid=" + APIkey + "&units=imperial"

    fetch(cityURL)
        .then((response) => response.json())
        .then((data) => {
            //Get Informational Data
            const place = data.name;
            var today = moment().format('l');
            const temp = data.main.temp;
            const wind = data.wind.speed;
            const humidity = data.main.humidity;

            //Appends variables into HTML
            currentCityEl.textContent = place + ' ' + '(' + today + ')'
            singleDayIcon.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
            currentTempEl.textContent = 'Temp: ' + temp + '°F';
            currentWindSpeedEl.textContent = 'Wind: ' + wind + ' MPH';
            currentHumidityEl.textContent = 'Humidity: ' + humidity + "%";
        });
}

//Displaying 5 Days of Projected Weather Data
function fiveDay(event) {
    event.preventDefault();

    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInputEl.value + "&appid=" + APIkey + "&units=imperial"
    console.log(fiveDayURL)

    //Five Day URL
    fetch(fiveDayURL)
        .then((response) => response.json())
        .then((data2) => {

            //Per API settings, gets data for next 5 days
            for (let i = 3; i <= data2.list.length; i += 9) {
                const temp = data2.list[i].main.temp;
                const wind = data2.list[i].wind.speed;
                const humidity = data2.list[i].main.humidity;

                var today = data2.list[i].dt_txt.split(' ')
                var card = document.createElement('div')
                var todayEl = document.createElement('h2')
                var icon = document.createElement('img')
                var temperature = document.createElement('p')
                var windEl = document.createElement('p')
                var humidityEl = document.createElement('p')

                icon.src = "https://openweathermap.org/img/wn/" + data2.list[i].weather[0].icon + ".png"

                todayEl.textContent = moment(today[0]).format('MM/DD/YYYY')
                temperature.textContent = temp + '°F'
                humidityEl.textContent = humidity + "%"
                windEl.textContent = wind + " MPH"

                card.appendChild(todayEl)
                card.appendChild(icon)
                card.appendChild(temperature)
                card.appendChild(windEl)
                card.appendChild(humidityEl)

                fiveDayEl.appendChild(card)
            }
        });
}

formTagEl.addEventListener('submit', currentWeather);
formTagEl.addEventListener('submit', fiveDay);

onload = getStorage();