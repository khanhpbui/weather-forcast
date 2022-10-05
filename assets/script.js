var myApiKey = '3ec99d50e44982bb832a15d753e79593';
var cityNameEl = document.querySelector('#city-name');
var srchBtnEl = document.querySelector('#srch-btn');
var srchedHistoryEl = document.querySelector('#srched-history');
var srchedCities = [];



function srchCity(event) {
    event.preventDefault();
    var cityNameVal = cityNameEl.value;
    var cityNameQuery = cityNameVal.replaceAll(' ', '');
    if (!cityNameQuery) {
        alert('Please enter the name of a city');
    }
    console.log(cityNameQuery)

    srchGeocoding(cityNameQuery);



}

function srchGeocoding(query) {

    var requestGeocodingUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + query + '&limit=1&appid=3ec99d50e44982bb832a15d753e79593';
    console.log(requestGeocodingUrl)
    fetch(requestGeocodingUrl)
        .then(function (response) {
            console.log(response)
            if (!response.ok) {
                throw response.json();
            }

            return response.json();
            console.log(response.json())
        })
        .then(function (geocodingData) {
            console.log(geocodingData)
            if (geocodingData.length === 0){
                alert('Please enter a valid name');
            }else{
                
            }
        }) 



}




srchBtnEl.addEventListener('click', srchCity)

function saveCities() {

}