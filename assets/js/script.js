let searchBtn = $('#search');
// let cityName = document.querySelector('#search-box');


function weatherReport() {
    let cityName = $('#search-box').val();

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=568ff9fafd7d7202b5ec934736eda812&units=imperial')
    .then(function(response) {
        if (response.ok) {
            return response.json();
        }
    }).then(function (weatherData) {
        
    })
}

searchBtn.on('click', weatherReport);