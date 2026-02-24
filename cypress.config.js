const { defineConfig } = require('cypress');
const { configurePlugin } = require('cypress-mongodb');
require('dotenv').config();

module.exports = defineConfig({
  allowCypressEnv: true,

  env: {
    baseApi: process.env.BASE_API,
    mongodb: {
      uri: process.env.DB_HOST,
      database: process.env.DB_NAME,
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      configurePlugin(on);
    },

    baseUrl: process.env.BASE_URL,
  },
});
