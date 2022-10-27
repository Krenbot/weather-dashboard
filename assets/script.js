const APIkey = "f792ea86435d6d03093ac74cf0bb3026";
const formTagEl = document.getElementById('form-test');
const searchHistoryEl = document.getElementById('search-history');
const cityNameEl = document.getElementById('city');

//City Display Elements
const currentTempEl = document.getElementById('temperature');
const currentCityEl = document.getElementById('city');
const currentWindSpeedEl = document.getElementById('wind-speed');
const currentHumidityEl = document.getElementById('humid');
const searchInputEl = document.getElementById("input");
const fiveDayEl = document.querySelector('.five-day');
const singleDayIcon = document.getElementById('single-day-icon');

//Save Searches to Local Storage
let pastSearch = JSON.parse(localStorage.getItem('pastSearch')) || [];

//Store Searched City and Create a Clickable Button
function storeSearch(cityName) {
    const pastSearchBtn = document.createElement('button');
    pastSearchBtn.setAttribute('class', 'btn btn-secondary');
    pastSearchBtn.innerText = cityName;
    searchHistoryEl.appendChild(pastSearchBtn);

    pastSearchBtn.addEventListener('click', function () {
        const cityName = pastSearchBtn.innerText;
        currentWeather(cityName)
        fiveDay(cityName)
    })
}

//Put Past Searches in LocalStorage
function appendStorage() {
    localStorage.setItem('pastSearch', JSON.stringify(pastSearch))
}

//Get Past Searches from Local Storage
function getStorage() {
    let storage = JSON.parse(localStorage.getItem('pastSearch'));
    if (storage) {
        storage.forEach(storeSearch)
    }
}

// Current Conditions of City
function currentWeather(cityName) {
    let cityURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIkey + "&units=imperial"

    fetch(cityURL)
        .then((response) => response.json())
        .then((data) => {
            //Get Informational Data
            const place = data.name;
            var today = moment().format('l');
            const temp = data.main.temp;
            const wind = data.wind.speed;
            const humidity = data.main.humidity;
            storeSearch(cityName)

            //Appends variables into HTML
            currentCityEl.textContent = place + ' ' + '(' + today + ')'
            singleDayIcon.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
            currentTempEl.textContent = 'Temp: ' + temp + '°F';
            currentWindSpeedEl.textContent = 'Wind: ' + wind + ' MPH';
            currentHumidityEl.textContent = 'Humidity: ' + humidity + "%";
        });
}

//Displaying 5 Days of Projected Weather Data
function fiveDay(cityName) {
    let fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIkey + "&units=imperial"

    //Clears Previous 5 day Divs
    fiveDayEl.innerHTML = ''

    //Five Day URL
    fetch(fiveDayURL)
        .then((response) => response.json())
        .then((fiveDayData) => {

            //Per API settings, gets data for next 5 days
            for (let i = 3; i <= fiveDayData.list.length; i += 9) {
                let temp = fiveDayData.list[i].main.temp;
                let wind = fiveDayData.list[i].wind.speed;
                let humidity = fiveDayData.list[i].main.humidity;
                let today = fiveDayData.list[i].dt_txt.split(' ')

                let col = document.createElement('div')
                let card = document.createElement('div')
                let todayEl = document.createElement('h2')
                let icon = document.createElement('img')
                let temperature = document.createElement('p')
                let windEl = document.createElement('p')
                let humidityEl = document.createElement('p')

                col.setAttribute("class", "col");
                card.setAttribute("class", "fiveDayCard");

                todayEl.textContent = moment(today[0]).format('ddd')
                icon.src = "https://openweathermap.org/img/wn/" + fiveDayData.list[i].weather[0].icon + ".png"
                temperature.textContent = 'Temp: ' + temp + '°F'
                windEl.textContent = 'Wind: ' + wind + " MPH"
                humidityEl.textContent = "Humidity: " + humidity + "%"

                card.appendChild(todayEl)
                card.appendChild(icon)
                card.appendChild(temperature)
                card.appendChild(windEl)
                card.appendChild(humidityEl)

                col.appendChild(card)
                fiveDayEl.appendChild(col)
            }
        });
}

//Listens for submits and reruns API
formTagEl.addEventListener('submit', function (event) {
    event.preventDefault();
    let cityName = searchInputEl.value
    currentWeather(cityName)
    fiveDay(cityName)
});

window.onload = getStorage();