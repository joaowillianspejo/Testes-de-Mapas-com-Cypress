const { defineConfig } = require('cypress');
const { allureCypress } = require('allure-cypress/reporter');
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
      allureCypress(on, config, {
        resultsDir: 'cypress/results/allure-results',
      });
      configurePlugin(on);

      return config;
    },

    baseUrl: process.env.BASE_URL,
  },
});
