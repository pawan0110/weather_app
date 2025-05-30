require("dotenv").config(); // Only needed for local development

const request = require("request");

const openWeatherApp = {
    BASE_URL: "https://api.openweathermap.org/data/2.5/weather?",
    SECRET_KEY: process.env.OPENWEATHER_API_KEY,
};

const WeatherData = (address, callback) => {
    const url = `${openWeatherApp.BASE_URL}q=${encodeURIComponent(address)}&appid=${openWeatherApp.SECRET_KEY}`;

    console.log(url);

    request({ url, json: true }, (error, data) => {
        if (error) {
            callback(true, "Unable to fetch data, please try again. " + error);
        }
        callback(false, data?.body);
    });
};

module.exports = WeatherData;
