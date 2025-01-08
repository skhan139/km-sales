const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'km-sales',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

