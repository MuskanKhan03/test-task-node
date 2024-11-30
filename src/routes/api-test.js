const { success, failure } = require('../utils/responses');
const { updateProvider, getPinnedProviders } = require('../repository/test.repository');
const fetchWeatherData = require('../utils/fetchWeatherData');

const WeatherAPI = async (event) => {
  const { httpMethod, body } = event;

  try {
    if (httpMethod === 'GET') {
      const weatherData = await fetchWeatherData();
      const pinnedProviders = await getPinnedProviders();

      const combinedResults = [
        ...pinnedProviders.map((provider) => ({
          providerName: provider.providerName,
          isPinned: provider.isPinned,
        })),
        ...weatherData.filter(
          (data) => !pinnedProviders.some((p) => p.providerName === data.providerName)
        ),
      ];

      return success({ data: combinedResults });
    }

    if (httpMethod === 'POST') {
      try {
        const { providerName, isPinned } = JSON.parse(body);

        if (!providerName || typeof isPinned !== 'boolean') {
          return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Invalid input data' }),
          };
        }
        const updatedProvider = await updateProvider(providerName, { isPinned });
        return {
          statusCode: 200,
          body: JSON.stringify({ data: updatedProvider }),
        };
      } catch (error) {
        console.error('Error updating provider:', error);

        return {
          statusCode: 500,
          body: JSON.stringify({ message: 'Internal Server Error' }),
        };
      }
    }

    return failure(400, 'Invalid HTTP method');
  } catch (err) {
    console.error('Error in Weather API:', err);
    return failure(err?.statusCode || 500, err?.message);
  }
};

module.exports = WeatherAPI;
