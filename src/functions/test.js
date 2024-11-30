const middy = require('middy');
const { initDB } = require('../middleware/initDb');
const { errorHandler } = require('../middleware/errorHandler');
const WeatherAPI = require('../routes/api-test');

exports.handler = middy(async (event) => {
  return WeatherAPI(event);
})
  .use(initDB)
  .use(errorHandler);
