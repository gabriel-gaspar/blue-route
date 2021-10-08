const express = require('express');
const routes = express.Router();
const appController = require('./controllers/AppController');

let accessCounter = {
    "value": 0
}

routes.get('/', appController.main(accessCounter));
routes.get('/metrics', appController.metrics);
routes.get('/connection', appController.connection);
routes.get('/health', appController.healthCheck(accessCounter))

module.exports = routes;