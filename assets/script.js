const APIkey = "f792ea86435d6d03093ac74cf0bb3026"
var searchBtn = $('#search-btn')
var city = $('#input')
var searchHistory = $('#search-history')

//Click Listener to Search Button
// function citySearch(event) {
//     event.preventDefault()
//     var cityName = city.val()
//     console.log(cityName)
// }
// citySearch()

// searchBtn.on('submit', citySearch);

//Show Main City
// function cityWeather() {
//     var queryURL = "api.openweathermap.org/data/2.5/weather?q" + city + "&appid=" + APIkey;
//     console.log(queryURL)
// }

// cityWeather()

//Show 5 day forecast

//Past Searches



//TUTOR INFO
let searchInputEl = document.getElementById("input");
let formTag = document.getElementById('form-test');

function citySearch (event){
    event.preventDefault();
    console.log(searchInputEl.value);
}

formTag.addEventListener('submit', citySearch);