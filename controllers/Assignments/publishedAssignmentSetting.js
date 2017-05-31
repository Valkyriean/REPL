/**
 * Created by 马鸣玉 on 2017/5/23.
 */
var Assignments = require('../../models/AssignmentModel');
var Classrooms = require('../../models/ClassroomsModel');
var Users = require('../../models/UserModel');



exports.unpublishAssignment = function (req, res) {
    Assignments.findOne({'assignmentID': req.body.assignmentID}, function (err, assignment) {
        if(err) throw err;
        if(assignment) {
            if(assignment.type === "publish") {
                assignment.type = "draft";
                assignment.dueDate = null;
                assignment.scheduleDate = null;
                res.json({'status': "success"});
            } else {
                res.json({'status': "cannot unpublish"});
            };
        } else {
            res.json({'status': "assignment does not exist"});
        };
    });
};

exports.handInAssignment = function (req, res) {
    
};

