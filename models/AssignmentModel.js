/**
 * Created by phant on 2017/1/26.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var IDcounter = require('./IDcounter').nextID('Assignments');
var counterPlugin = require('../plugins/counterPlugin').counterPlugin(Assignment,"Assignments");

var Assignment = new Schema({
    assignmentID: Number,
    type: String,
    //publish,schedual,draft,correctionType
    givenCode: String,
    description: String,
    SudentWorks: Array,
    //userID, status, code, comment
    dueDate: Date,
    schedualDate: Date,
    correctionType: String,
    //Manual , Auto
    testCases: Array,
    classroomID: Array
});

// Assignment.pre('save', function(next,done) {
//     var self = this;
//     if (this.isNew) {
//         IDcounter.next(function (nextID) {
//             self.UserID = nextID;
//             next();
//         });
//     } else {
//         next();
//     }
// });
Assignment.plugin(counterPlugin);

module.exports = mongoose.model('Assignment', Assignment);