// checks if there are any searched cities saved in local storage.
// if not, sets searchedCities to an empty array
let searchedCities = JSON.parse(localStorage.getItem('searchedCities')) || [];

let searchBtn = $('#search');

function weatherReport(city) {

    // The text box \/
    let cityName =  city || $('#search-box').val();
    // let cityName = city || 'boston'

    // TODO: whats the right kind of api call to use?
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=568ff9fafd7d7202b5ec934736eda812')
    
    .then(function(response) {
        if (response.ok) {
            return response.json();
        }
    }).then(function (getCoords) {

        // set variables to coordinates
        let lat = getCoords.coord.lat;
        let lon = getCoords.coord.lon;

        return fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,alerts&units=imperial&appid=568ff9fafd7d7202b5ec934736eda812');
 
    }).then(function (response) {
        return response.json();

    }).then(function(weatherData) {

        let uvi = weatherData.current.uvi;

        // capitalize first letter of city name and put the text in h1
        cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();
        $('#city-name').text(cityName + ' ' + dayjs().format('MM-DD-YYYY')).append('<img class=\'icon\'>');

        // this my be a problem later if I use icon class again   
        $('.icon').attr('src', 'http://openweathermap.org/img/wn/' + weatherData.current.weather[0].icon + '@2x.png');
       
        // set the text content for the the rest of the weather data
        $('#temp').text('Temp: ' + weatherData.current.temp + ' °F');
        $('#wind').text('Wind: ' + weatherData.current.wind_speed + ' MPH');
        $('#humidity').text('Humidity: ' + weatherData.current.humidity + ' %');
        $('#uv-index').text('UV-index: ').append('<span id=\'uv-color\'></span>');
        let uvColor = $('#uv-color').text(uvi);


        // coloring the uv index
        if (uvi < 3) {
            uvColor.attr('id', 'uvi-low');
        } else if (uvi < 5) {
            uvColor.attr('id', 'uvi-moderate');
        } else if (uvi < 8) {
            uvColor.attr('id', 'uvi-high');
        } else if (uvi < 11 ) {
            uvColor.attr('id', 'uvi-very-high');
        } else {
            uvColor.attr('id', 'uvi-extreme');
        }

        // title for future weather section
        $('#future-weather').children('h2').text('5-Day Forecast');

        // populates li with data 
        for (let i = 0; i < 5; i++) {
            let date = dayjs.unix(weatherData.daily[i].dt).format('MM-DD-YYYY');
            $('#' + i).children('.date').text(date);
            $('#' + i).children('img').attr('src', 'http://openweathermap.org/img/wn/' + weatherData.daily[i].weather[0].icon + '@2x.png')
            $('#' + i).children('.temp').text('Temp: ' + weatherData.daily[i].temp.day + ' °F');
            $('#' + i).children('.wind').text('Wind: ' + weatherData.daily[i].wind_speed + ' MPH');
            $('#' + i).children('.humidity').text('Humidity: ' + weatherData.daily[i].humidity + ' %');
        }

        // TODO: then push it to an array and save it to local storage
        // if (searchedCities.length === 0) {
        //     searchedCities.push(cityName);
        // } else if (searchedCities.length > 0) {
        //     for (let i = 0; i < searchedCities.length; i++) {
        //         if (cityName === searchedCities[i]) {
        //             return;
        //         } else if (i === searchedCities.length - 1 && cityName !== searchedCities[i]) {
        //             searchedCities.push(cityName);
        //             return;
        //         }
        //     }
        // }

        if (!searchedCities.includes(cityName)) {
            searchedCities.push(cityName)
        }

        localStorage.setItem('searchedCities', JSON.stringify(searchedCities));

    });

}

function renderPastCities() {

    let list = $('.list-group').empty()

    for (let city of searchedCities) {
        $('<button>')
            .text(city)
            .appendTo(list)
            .on('click', () => {
                searchBtn.val(city)
                weatherReport(city)
            })
    }
}

searchBtn.on('click', () => weatherReport($('#search-box').val()));
renderPastCities()
