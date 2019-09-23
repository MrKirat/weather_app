var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res
    .status('200')
    .type('json')
    .send({message: "This is custom weather API. Check /weather endpoint."});
});

module.exports = router;
