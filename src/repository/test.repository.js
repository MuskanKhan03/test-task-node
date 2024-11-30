const WeatherProviderModel = require('../models/test.model');

const createProvider = (payload) => {
  return WeatherProviderModel.create(payload);
};

const updateProvider = (providerName, updateData) => {
  return WeatherProviderModel.findOneAndUpdate({ providerName }, updateData, {
    new: true,
    upsert: true,
  });
};

const getPinnedProviders = () => {
  return WeatherProviderModel.find({ isPinned: true }).sort({ providerName: 1 });
};

module.exports = {
  createProvider,
  updateProvider,
  getPinnedProviders,
};
