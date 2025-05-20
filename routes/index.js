const request = require("request");

const openWeatherApp = {
    BASE_URL: "https://api.openweathermap.org/data/2.5/weather?",
    SECRET_KEY: "2b638741116ace51b12193c4ca592252",
};

const WeatherData = (address, callback) => {
    const url = `${openWeatherApp.BASE_URL}q=${encodeURIComponent(address)}&appid=${openWeatherApp.SECRET_KEY}`;

    console.log(url);

    request({url, json: true}, (error, data) => {
        if(error) {
            callback(true, "unable to fetch data, please try again" + error);
        }
        callback(false, data?.body);
    });
    
};

module.exports = WeatherData;