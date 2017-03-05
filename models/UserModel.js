/**
 * Created by phant on 2017/1/26.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var IDcounter = require('./IDcounter').nextID('Users');

var User = new Schema({
    UserID: Number,
    email: String,
    firstname: String,
    lastname: String,
    pass: { type: String, required: true }
});

User.pre('save', function(next,done) {
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


//         this.UserID = IDcounter.nextID("Users");
//         console.log(this.UserID + "and yes is new");
//         next();
//     }else{
//         console.log("old");
//         next();
//     }
// });


module.exports = mongoose.model('User', User);