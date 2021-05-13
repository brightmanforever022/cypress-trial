// eslint-disable-next-line no-unused-vars
const path = require('path');
const dotenv = require('dotenv');
const awsmobile = require(path.join(__dirname, '../../aws-exports.js'));

dotenv.config();

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  config.env.cognito_username = process.env.AWS_COGNITO_USERNAME
  config.env.cognito_password = process.env.AWS_COGNITO_PASSWORD
  config.env.awsConfig = awsmobile.default

  return config
}
