const axios = require('axios');
require('dotenv').config();

const weatherProviders = [
  {
    name: 'OpenWeatherMap',
    url: `https://api.openweathermap.org/data/2.5/weather?lat=19.0760&lon=72.8777&appid=${process.env.OPENWEATHER_API_KEY}`,
    parse: (response) => ({
      providerName: 'OpenWeatherMap',
      temperature: response.data.main.temp,
      windSpeed: response.data.wind.speed,
    }),
  },
  {
    name: 'WeatherAPI',
    url: `https://api.weatherapi.com/v1/current.json?q=19.0760%2C72.8777&key=${process.env.WEATHERAPI_API_KEY}`,
    parse: (response) => ({
      providerName: 'WeatherAPI',
      temperature: response.data.current.temp_c,
      windSpeed: response.data.current.wind_kph,
    }),
  },
  {
    name: 'WeatherStack',
    url: `https://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_API_KEY}&query=19.0760,72.8777`,
    parse: (response) => ({
      providerName: 'WeatherStack',
      temperature: response.data.current.temperature,
      windSpeed: response.data.current.wind_speed,
    }),
  },
];

const fetchWeatherData = async () => {
  const results = [];

  for (const provider of weatherProviders) {
    try {
      const response = await axios.get(provider.url);
      results.push(provider.parse(response));
    } catch (error) {
      console.error(`Failed to fetch data from ${provider.name}:`, error.message);
    }
  }

  return results;
};

module.exports = fetchWeatherData;
