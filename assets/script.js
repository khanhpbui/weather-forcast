var myApiKey = '3ec99d50e44982bb832a15d753e79593';
var srchBtnEl = document.querySelector('#srch-btn');
var srchedHistoryEl = document.querySelector('#srched-history');




function srchCity(event) {
    event.preventDefault();
    var cityNameVal = document.querySelector('#city-name').value;
    if (!cityNameVal) {
        alert('Please enter the name of a city');
    }
    var
}


srchBtnEl.addEventListener('click', srchCity)