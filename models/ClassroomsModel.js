/**
 * Created by phant on 2017/1/26.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Classrooms = new Schema({
    classroomID: Number,
    owner: Number,
    teachers: Array,
    students: Array,
    name: String,
    description: String,
    programLanguage: String
});

module.exports = mongoose.model('Classrooms', Classrooms);