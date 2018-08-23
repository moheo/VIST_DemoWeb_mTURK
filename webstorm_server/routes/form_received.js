var express = require('express');
var router = express.Router();

/* copied from user.js */
router.get('/', function(req, res, next) {
  res.writeHead(200);
  res.end("hello here is form_ received");
  console.log(req.value);
});

module.exports = router;
