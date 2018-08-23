var express = require('express');
var router = express.Router();
let Ans = require('../models/answer')
let ers = require('../script/extract_random_story');
let rand = require('random-key');

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



router.post('/', function(req, res){
  let assignmentId = req.body.assignmentId;
  let workerID = req.body.workerID;
  let story_id = req.body.story_id;
  let focused = req.body.focused;
  let coherent = req.body.coherent;
  let share = req.body.share;
  let human = req.body.human;
  let grounded = req.body.grounded;
  let detailed = req.body.detailed;

  // Ans constructor is defined at models/answer.js and exported by the last line with mongoose.model('Ans', answerSchema)
  let answer_data = new Ans({
      assignmentId: assignmentId,
      workerID: workerID,  
      story_id: story_id,
      focused: focused,
      coherent: coherent,
      share: share,
      human: human,
      grounded: grounded,
      detailed: detailed,
  })

  answer_data.save()
    .then(()=>{
      res.render('afterpost', {title: "success", 
                               msg: "Submission Success! Copy and paste the submission key below", 
                               submission_key: rand.generate(10)
                             }
                );
      /*res.json({
        status: 200,
        message: 'success',
        data: true,
        submission_key: rand.generate(10),
      });*/
    })
    .catch((err)=>{
      res.render('afterpost', {title: "fail", 
                               msg: "Submission Fail: Please let requester know about this", 
                               submission_key: "Seonil_Son, sison@bi.snu.ac.kr"
                             }
                );
      /*res.status(500).json({
        status: 500,
        message: err,
        data: false,
      });*/
    });

});

module.exports = router;

//check at the shell
//mongo
//> show databases
