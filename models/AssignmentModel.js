/**
 * Created by phant on 2017/1/26.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Assignment = new Schema({
    assignmentID: Number,
    type: String,
    givenCode: String,
    description: String,
    SudentWorks: Array,
    //userID, status, code, commond
    dueDate: Date,
    schedualDate: Date,
    correctionType: String,
    testCases: Array,
    classroomID: Array
});

module.exports = mongoose.model('Assignment', Assignment);