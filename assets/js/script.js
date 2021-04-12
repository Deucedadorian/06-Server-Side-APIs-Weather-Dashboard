let searchBtn = $('#search');
// let cityName = document.querySelector('#search-box');
let cityName = $('search-box');

function weatherReport() {
    // console log city name
    console.log($('search-box').val());

//     fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=568ff9fafd7d7202b5ec934736eda812&units=imperial')
//     .then(function(response) {
//         if (response.ok) {
//             return response.json();
//         }
//     }).then(function (something) {
//         console.log(something);
//     })
}

searchBtn.on('click', weatherReport);