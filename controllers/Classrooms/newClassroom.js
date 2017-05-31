var Classrooms = require('../../models/ClassroomsModel');
var Users = require('../../models/UserModel');
var Assignments = require('../../models/AssignmentModel')
var a = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9"];


var generateJoinCode = function(Classrooms) {
    var joinCode = String;
    var condition = true;
    while(condition) {
        Classrooms.findOne({'joinCode':joinCode},function(error,classroom){
            if(error) throw error;
            if(classroom) {
                for (var i=0; i<4; i++){
                    var randNumber = Math.round(Math.random() * 36 + 1);
                    joinCode += a[randNumber];
                };
            } else {
                condition = false;
            };
        });
        return joinCode;
    };
};

exports.newClassroom = function(req, res) {
    Users.findOne({"userID": req.decoded}, function(err, user) {
        if(err) throw err;
        if(user) {
            if(user.type === "student") {
                res.json({"status": "user no power"});
            } else {
                var joinCode = generateJoinCode(Classrooms);
                
                var data = {
                    owner: req.decoded,
                    teacher: null,
                    student: null,
                    name: req.body.name,
                    description: req.body.description,
                    programLanguage: req.body.programLanguage,
                    joinCode: joinCode
                };
                var newClassroom = new Classrooms(data);
                newClassroom.save(function(err) {
                    if (err) {
                        res.json({"status": "classroom save failed for no reason"});
                    }else{
                        console.log('Classroom saved successfully!');
                        res.json({"status": 1});
                    };
                });
            };
        };
    });
};

exports.cloneClassrooms = function(req, res) {
    Users.findOne({'userID': req.decoded}, function (err,user) {
        if(err) throw err;
        if(user) {
            if(user.type === "student") {
                res.json({'status':"user no power"})
            } else {
                Classrooms.findOne({'classroomID': req.body.classroomID}, function (error, classroom) {
                    if (error) throw error;
                    if (classroom) {
                        var joinCode = generateJoinCode(Classrooms);
                        var data = {
                            owner: req.decoded,
                            teacher: null,
                            student: null,
                            name: classroom.name + " clone",
                            description: classroom.description,
                            programLanguage: classroom.programLanguage,
                            joinCode: joinCode
                        };
                        var newClassroom = new Classrooms(data);
                        newClassroom.save(function (err) {
                            if (err) {
                                res.json({"status": "classroom save failed for no reason"});
                            } else {
                                console.log('Classroom saved successfully!');
                                Assignments.find({'classroomID': req.body.classroomID}, function (error, assignments) {
                                    if(error) throw error;
                                    if(assignments) {
                                        var status = true;
                                        for(var assignment in assignments) {
                                            var assignmentdata = {
                                                type: "draft",
                                                givencode: assignment.givencode,
                                                description: assignment.description,
                                                studentWorks: null,
                                                dueDate: null,
                                                scheduleDate: null,
                                                correctionType: assignment.correctionType,
                                                testCases: assignment.testCases,
                                                classroomID: newClassroom.classroomID
                                            };
                                            var newAssignment = new Assignments(assignmentdata);
                                            newAssignment.save(function (err) {
                                                if(err) {
                                                    status = false;
                                                };
                                            });
                                        };
                                        if(status) {
                                            res.json({'status': "success"});
                                        } else {
                                            res.json({'status': "failed"});
                                        };
                                    };
                                });
                            };
                        });
                    };
                });
            };
        };
    });
};