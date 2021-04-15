let searchBtn = $('#search');

function weatherReport() {

    // The text box \/
    // let cityName = $('#search-box').val();
    let cityName = 'boston';

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

        return fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,alerts&units=imperial&appid=568ff9fafd7d7202b5ec934736eda812')
 
    }).then(function (response) {
        return response.json();
    }).then(function(weatherData) {

        // console log output
        console.log(weatherData);

        // image tag with source
        // 'http://openweathermap.org/img/wn/' + weatherData.current.weather.icon + '@2x.png';

        // capitalize first letter of city name and put the text in h1
        $('#city-name').text(cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase() + ' ' + dayjs().format('MM-DD-YYYY')).append('<img class=\'icon\'>');
        
        // this my be a problem later if I use icon class again   
        $('.icon').attr('src', 'http://openweathermap.org/img/wn/' + weatherData.current.weather[0].icon + '@2x.png');

    })


}

searchBtn.on('click', weatherReport);