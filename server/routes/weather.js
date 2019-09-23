var express = require('express');
var axios = require('axios');
var dotenv = require('dotenv');
var router = express.Router();

dotenv.config();

const OWM_API_KEY = process.env.OWM_API_KEY,
      OWM_FORECAST_ENDPOINT = 'https://api.openweathermap.org/data/2.5/forecast';

/* GET weather for 5 days. */
router.get('/', function (req, res) {
  axios.get(`${OWM_FORECAST_ENDPOINT}?q=${req.query.city}&appid=${OWM_API_KEY}`)
    .then(response => {
      res
        .type('json')
        .send(response.data);
    })
    .catch(error => {
      res
        .status('404')
        .type('json')
        .send({message: 'The city not found. Modify city URL parameter.'});
    });
});

module.exports = router;
