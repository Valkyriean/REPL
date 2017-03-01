/**
 * Created by phant on 2017/1/26.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Classroom = new Schema({
    UserID: number,
    AssignmentID: number,
    ClassRoom: String,
    ProgramLanguage: String
});

module.exports = mongoose.model('Classroom', Classroom);