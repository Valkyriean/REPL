/**
 * Created by phant on 2017/1/26.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var IDcounter = require('./IDcounter').nextID('Users');

var User = new Schema({
    userID: Number,
    email: String,
    teacher: Boolean,
    firstname: String,
    lastname: String,
    pass: { type: String, required: true }
});

User.pre('save', function(next,done) {
    var self = this;
    if (this.isNew) {
        IDcounter.next(function (nextID) {
            self.userID = nextID;
            next();
        });
    } else {
        next();
    }
});

module.exports = mongoose.model('User', User);