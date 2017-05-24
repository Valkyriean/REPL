var Assignments = require('../../models/AssignmentModel');
var Classrooms = require('../../models/ClassroomsModel');
var Users = require('../../models/UserModel');

exports.newAssignment = function(req, res) {
    Users.findOne({"userID": req.decoded}, function(err, user){
        if(err) throw err;
        if(user) {
            if(user.type === "student") {
                res.json({"status": "user no power"});
            } else {
                var data = {
                    type: req.body.type,
                    givencode: req.body.givencode,
                    description: req.body.description,
                    studentWorks: null,
                    dueDate: req.body.dueDate,
                    schedualDate: req.body.schedualDate,
                    publishDate: req.body.publishDate,
                    correctionType: req.body.correctionType,
                    testCases: req.body.testCases,
                    classroomID: req.body.classroomID
                };
                var newAssignment = new Assignments(data);
                newAssignment.save(function (error) {
                    if(error) {
                        res.json({'status': "failed to save"});
                    } else {
                        res.json({'status': "success"});
                    };
                });
            };
        };
    });
};