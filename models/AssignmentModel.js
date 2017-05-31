/**
 * Created by phant on 2017/1/26.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var IDcounter = require('./IDcounter').nextID('Assignments');

var Assignment = new Schema({
    assignmentID: Number,
    type: String,
    //publish,schedule,draft,correctionType,dued
    givenCode: String,
    description: String,
    StudentWorks: Array,
    //userID, status, code, comment
    dueDate: Date,
    scheduleDate: Date,
    correctionType: String,
    //Manual , Auto
    testCases: Array,
    classroomID: Number
});

Assignment.pre('save', function(next,done) {
    var self = this;
    if (this.isNew) {
        IDcounter.next(function (nextID) {
            self.UserID = nextID;
            next();
        });
    } else {
        next();
    }
});

module.exports = mongoose.model('Assignment', Assignment);