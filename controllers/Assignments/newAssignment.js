var Assignments = require('../../models/AssignmentModel')
var Classrooms = require('../../models/ClassroomsModel');
var User = require('../../models/UserModel');

exports.newAssignment = function(req, res) {
    User.findOne({"userID": req.decoded}, function(err, user){
        if(err) throw err;
        if(user) {
            if(user.type === "student") {
                res.json({"status": "user no power"});
            } else {
                var data = {
                    type: req.body.type,
                    givencode: req.body.givencode
                };
            }
        }
    });
};