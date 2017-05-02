/**
 * Created by phant on 2017/1/26.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var IDcounter = require('./IDcounter').nextID('Classrooms');


var Classrooms = new Schema({
    classroomID: Number,
    owner: Number,
    teachers: Array,
    students: Array,
    name: String,
    description: String,
    programLanguage: String,
    joincode: String,
    allowToEnter: {type: Boolean, default: true },
    allowToLeave: {type: Boolean, default: true }
});

Classrooms.pre('save', function(next,done) {
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

module.exports = mongoose.model('Classrooms', Classrooms);
