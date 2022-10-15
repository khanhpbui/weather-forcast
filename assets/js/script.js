var cityInputEl = $('#input-city');
var srchBtnEl = $('#srch-btn');
var todayWeatherEl = $('#today-weather');
var cityNameEl = $('#city-name');
var tempEl = $('#temp');
var windEl = $('#wind');
var humidityEl = $('#humidity');
var forcastFiveDayEl = $('#5-day-forcast');
var srchedHistory = [];
var srchedHistoryEl = $('#srched-history');
var cityBtnEl = $('.city-btn');
var historyBtn = $('.srched-cities-btn');



function srchCity(event) {
    event.preventDefault();
    init();
    var cityNameVal = cityInputEl.val();
    srchGeocoding(cityNameVal);
    // only add the button when clicked, not touching local storage
    if (cityNameVal !== '') {
        var srchedCitiesBtn = $('<button>').addClass('srched-cities-btn').attr('value', cityNameVal);
        srchedCitiesBtn.text(cityNameVal);
        srchedHistoryEl.append(srchedCitiesBtn);
    };
};
// Get lat and lon values
function srchGeocoding(query) {
    var requestGeocodingUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + query + ',,US&limit=1&appid=3ec99d50e44982bb832a15d753e79593';
    fetch(requestGeocodingUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            };
            return response.json();
        })
        .then(function (geocodingData) {
            var lat = geocodingData[0].lat;
            var lon = geocodingData[0].lon;
            if (geocodingData.length === 0) {
                alert('Please enter a valid city');
            };
            srchedHistory.push(geocodingData[0].name);
            localStorage.setItem('city', JSON.stringify(srchedHistory));
            getCurrentWeather(lat, lon);
            getForcastWeather(lat, lon);
        })
        .catch(function (error) {
            console.error(error);
        });
};
// Forcast current weather
function getCurrentWeather(lat, lon) {
    var requestCurrentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=3ec99d50e44982bb832a15d753e79593&units=imperial';
    fetch(requestCurrentWeatherUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            };
            return response.json();
        })
        .then(function (currentWeatherData) {
            console.log(currentWeatherData)
            var icon = '<img src="http://openweathermap.org/img/wn/' + currentWeatherData.weather[0].icon + '.png" alt="weather icon">';
            cityNameEl.text(currentWeatherData.name + ' (' + moment().format('M/D/YYYY') + ') ');
            cityNameEl.append(icon)
            tempEl.text('Temp: ' + currentWeatherData.main.temp + '°F');
            humidityEl.text('Humidity: ' + currentWeatherData.main.humidity + ' %');
            windEl.text('Wind: ' + currentWeatherData.wind.speed + ' MPH');
        });
};
// Forcast 5 days
function getForcastWeather(lat, lon) {
    var requestForcastWeatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=3ec99d50e44982bb832a15d753e79593&units=imperial';
    fetch(requestForcastWeatherUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            };
            return response.json();
        })
        .then(function (weatherData) {
            forcastFiveDayEl.empty();
            for (var i = 0; i < 5; i++) {
                var cityName = weatherData.city.name;
                var forcastIndex = i * 8 + 3;
                var eachDay = $('<div>').addClass('day col-sm-2').attr('id', forcastIndex);
                var date = moment(weatherData.list[forcastIndex].dt_txt, 'YYYY-MM-DD HH:mm:ss').format('M/D/YYYY');
                var icon = '<img src="http://openweathermap.org/img/wn/' + weatherData.list[forcastIndex].weather[0].icon + '.png" alt="weather icon">';
                var temp = 'Temp: ' + weatherData.list[forcastIndex].main.temp + '°F<br><br>';
                var humidity = 'Humidity: ' + weatherData.list[forcastIndex].main.humidity + ' %';
                var wind = 'Wind: ' + weatherData.list[forcastIndex].wind.speed + ' MPH<br><br>';
                eachDay.html('<h4>' + cityName + ' ' + date + ' ' + icon + '</h4>');
                eachDay.append(temp, wind, humidity);
                forcastFiveDayEl.append(eachDay);
            }
        });
};

function init() {
    var localCities = JSON.parse(localStorage.getItem('city'));
    if (localCities !== null) {
        srchedHistory = localCities;
    };
}
srchedHistory.forEach((item, index) => {
    if (item !== '') {
        var srchedCitiesBtn = $('<button>').addClass('srched-cities-btn').attr('value', srchedHistory[index]);
        srchedCitiesBtn.text(srchedHistory[index]);
        srchedHistoryEl.append(srchedCitiesBtn);
    }
});

function updateCityVal(event) {
    event.preventDefault();
    srchGeocoding(this.value);
};

$('body').on('click', 'button.srched-cities-btn', updateCityVal);
srchBtnEl.click(srchCity);

init();
// page reload , when it loads for the first time
srchedHistory.forEach((item, index) => {
    if (item !== '') {
        var srchedCitiesBtn = $('<button>').addClass('srched-cities-btn').attr('value', srchedHistory[index]);
        srchedCitiesBtn.text(srchedHistory[index]);
        srchedHistoryEl.append(srchedCitiesBtn);
    }
});