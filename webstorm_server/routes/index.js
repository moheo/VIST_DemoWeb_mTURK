var express = require('express');
var router = express.Router();
let Ans = require('../models/answer')
let ers = require('../script/extract_random_story');
let rand = require('random-key');

/* GET home page. */
//router.get('/', function(req, res, next) {
router.get('/', function(req, res, next) {
  let random_item = ers.get_random_item();
  start_time = new Date(); // start time from rendering: global scope
  //let start_time
  res.render('index', {
      photo_0_0: random_item[0][0][0], //this tries to GET from URL returned by ers.py
      photo_0_1: random_item[0][0][1],
      photo_0_2: random_item[0][0][2],
      photo_0_3: random_item[0][0][3],
      photo_0_4: random_item[0][0][4],

      photo_1_0: random_item[1][0][0],
      photo_1_1: random_item[1][0][1],
      photo_1_2: random_item[1][0][2],
      photo_1_3: random_item[1][0][3],
      photo_1_4: random_item[1][0][4],
      
      photo_2_0: random_item[2][0][0],
      photo_2_1: random_item[2][0][1],
      photo_2_2: random_item[2][0][2],
      photo_2_3: random_item[2][0][3],
      photo_2_4: random_item[2][0][4],
      
      photo_3_0: random_item[3][0][0],
      photo_3_1: random_item[3][0][1],
      photo_3_2: random_item[3][0][2],
      photo_3_3: random_item[3][0][3],
      photo_3_4: random_item[3][0][4],
      
      photo_4_0: random_item[4][0][0],
      photo_4_1: random_item[4][0][1],
      photo_4_2: random_item[4][0][2],
      photo_4_3: random_item[4][0][3],
      photo_4_4: random_item[4][0][4],
      
      story0: random_item[0][1],
      story1: random_item[1][1],
      story2: random_item[2][1],
      story3: random_item[3][1],
      story4: random_item[4][1],

      story_id0: random_item[0][2],
      story_id1: random_item[1][2],
      story_id2: random_item[2][2],
      story_id3: random_item[3][2],
      story_id4: random_item[4][2],
    }
  );
});



router.post('/', function(req, res){
  let end_time = new Date();
  
  //let assignmentId = req.body.assignmentId;
  //let workerID = req.body.workerID;
  let story_id = req.body.story_id;
  let sub_key = rand.generate(10);
  let duration_on_survey = (end_time - start_time)/1000; // it's in msec unit thus convert it into sec
  
  let focused0 = req.body.focused0;
  let coherent0 = req.body.coherent0;
  let share0 = req.body.share0;
  let human0 = req.body.human0;
  let grounded0 = req.body.grounded0;
  let detailed0 = req.body.detailed0;

  let focused1 = req.body.focused1;
  let coherent1 = req.body.coherent1;
  let share1 = req.body.share1;
  let human1 = req.body.human1;
  let grounded1 = req.body.grounded1;
  let detailed1 = req.body.detailed1;

  let focused2 = req.body.focused2;
  let coherent2 = req.body.coherent2;
  let share2 = req.body.share2;
  let human2 = req.body.human2;
  let grounded2 = req.body.grounded2;
  let detailed2 = req.body.detailed2;

  let focused3 = req.body.focused3;
  let coherent3 = req.body.coherent3;
  let share3 = req.body.share3;
  let human3 = req.body.human3;
  let grounded3 = req.body.grounded3;
  let detailed3 = req.body.detailed3;

  let focused4 = req.body.focused4;
  let coherent4 = req.body.coherent4;
  let share4 = req.body.share4;
  let human4 = req.body.human4;
  let grounded4 = req.body.grounded4;
  let detailed4 = req.body.detailed4;


  // Ans constructor is defined at models/answer.js and exported by the last line with mongoose.model('Ans', answerSchema)
  let answer_data = new Ans({
      //assignmentId: assignmentId,
      //workerID: workerID,  
      story_id: story_id,
      submission_key: sub_key,
      time_spent: duration_on_survey,

      focused0: focused0,
      coherent0: coherent0,
      share0: share0,
      human0: human0,
      grounded0: grounded0,
      detailed0: detailed0,


      focused1: focused1,
      coherent1: coherent1,
      share1: share1,
      human1: human1,
      grounded1: grounded1,
      detailed1: detailed1,

      focused2: focused2,
      coherent2: coherent2,
      share2: share2,
      human2: human2,
      grounded2: grounded2,
      detailed2: detailed2,


      focused3: focused3,
      coherent3: coherent3,
      share3: share3,
      human3: human3,
      grounded3: grounded3,
      detailed3: detailed3,

      focused4: focused4,
      coherent4: coherent4,
      share4: share4,
      human4: human4,
      grounded4: grounded4,
      detailed4: detailed4,

  })

  answer_data.save()
    .then(()=>{
      res.render('afterpost', {title: "success", 
                               msg: "Submission Success! Copy and paste the submission key below. Thanks for your great work =]", 
                               submission_key: sub_key,
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
                               msg: "Submission Fail: Please let the requester know about this", 
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
