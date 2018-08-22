var express = require('express');
var router = express.Router();

let ers = require('../script/extract_random_story');

/* GET home page. */
router.get('/', function(req, res, next) {
  let random_item = ers.get_random_item();

  res.render('index', {
      photo_0: random_item[0][0],
      photo_1: random_item[0][1],
      photo_2: random_item[0][2],
      photo_3: random_item[0][3],
      photo_4: random_item[0][4],
      story: random_item[1],
      story_id: random_item[2],
    }
  );
});

module.exports = router;
