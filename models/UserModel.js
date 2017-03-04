/**
 * Created by phant on 2017/1/26.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var IDcounter = require('./IDcounter');

var User = new Schema({
    UserID: Number,
    email: String,
    firstname: String,
    lastname: String,
    pass: { type: String, required: true }
});

User.pre('save', function(next,done){
    console.log("llllllllllllllooooooooollll");
    if(this.isNew){
        this.UserID = IDcounter.nextID("Users");
        console.log(this.UserID + "and yes is new");
        next();
    }else{
        console.log("old");
        next();
    }
});


module.exports = mongoose.model('User', User);