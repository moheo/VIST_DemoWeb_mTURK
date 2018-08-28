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
  
  focused: Number,
  coherent: Number,
  share: Number,
  human: Number,
  grounded: Number,
  detailed: Number,
})

module.exports = mongoose.model('Ans', answerSchema);