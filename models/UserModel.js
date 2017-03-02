/**
 * Created by phant on 2017/1/26.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    // UserID: String,
    // email: String,
    // password: String,
    // state: String
    email: String,
    firstname: String,
    lastname: String,
    pass: { type: String, required: true }
});
//TODO This is just for test.

module.exports = mongoose.model('User', User);