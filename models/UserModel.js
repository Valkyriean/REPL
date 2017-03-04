/**
 * Created by phant on 2017/1/26.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var IDcounter = require('IDcounter').nextID('Users');

var User = new Schema({
    UserID: Number,
    email: String,
    firstname: String,
    lastname: String,
    pass: { type: String, required: true }
});

User.pre('save', function(next,done){
    if(this.isNew){
        IDcounter.next(function(theNextID){
            this.UserID = theNextID;
            next();
        });
    }else{
        next();
    };
});


module.exports = mongoose.model('User', User);