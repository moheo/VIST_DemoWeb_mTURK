/* of no use: express.static() @ app.js resolve file loading problems 


var express = require('express');
var router = express.Router();

let fs = require('fs');
 

router.get('/public', function(req, res, next) {
  let img_id_pattern = new RegExp(/[0-9]+\.jpg$/);
  let req_url = JSON.stringify(req);
  let extracted = img_id_pattern.exec(req_url);
  res.writeHead(200);
  res.end(req_url + "\n" + extracted);
  //let img_f = fs.readFileSync('images/test/')
});

module.exports = router;
*/