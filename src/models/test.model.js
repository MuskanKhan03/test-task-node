const { Schema, model } = require('mongoose');

const weatherProviderSchema = new Schema({
  providerName: {
    type: String,
    required: true,
    unique: true,
  },
  isPinned: {
    type: Boolean,
    default: false,
  },
});

module.exports = model('WeatherProvider', weatherProviderSchema);
