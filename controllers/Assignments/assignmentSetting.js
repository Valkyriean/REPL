/**
 * Created by 马鸣玉 on 2017/5/23.
 */
var Assignments = require('../../models/AssignmentModel');
var Classrooms = require('../../models/ClassroomsModel');
var Users = require('../../models/UserModel');

exports.unpublishAssignment = function (req, res) {
    Users.findOne({'userID': req.decoded}, function (error, user) {
        if(error) throw error;
        if(user) {
            if(user.type === "student") {
                res.json({'status': "user no power"});
            } else {
                Assignments.findOne({'assignmentID': req.body.assignmentID}, function (err, assignment) {
                    if(err) throw err;
                    if(assignment) {
                        if(assignment.type === "publish") {
                            
                        }
                    }
                })
            }

        }
    });

};