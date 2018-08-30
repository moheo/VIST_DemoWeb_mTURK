//schema for post data restoring

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

mongoose.Promise = global.Promise

let answerSchema = new Schema({
  //assignmentId: String,
  //workerID: String, //I need to convert team name to workerID 
  story_id: Number,
  submission_key: String,
  time_spent: Number, 
  
  focused0: Number,
  coherent0: Number,
  share0: Number,
  human0: Number,
  grounded0: Number,
  detailed0: Number,

  focused1: Number,
  coherent1: Number,
  share1: Number,
  human1: Number,
  grounded1: Number,
  detailed1: Number,

  focused2: Number,
  coherent2: Number,
  share2: Number,
  human2: Number,
  grounded2: Number,
  detailed2: Number,

  focused3: Number,
  coherent3: Number,
  share3: Number,
  human3: Number,
  grounded3: Number,
  detailed3: Number,

  focused4: Number,
  coherent4: Number,
  share4: Number,
  human4: Number,
  grounded4: Number,
  detailed4: Number,
})

module.exports = mongoose.model('Ans', answerSchema);