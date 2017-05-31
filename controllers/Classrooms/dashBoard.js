var Classrooms = require('../../models/ClassroomsModel');
var Assignments = require('../../models/AssignmentModel');
var Users = require('../../models/UserModel');


exports.postDashboard = function(req,res){
    var myDate = new Date();
    var type;
    var id;
    Users.findOne({'userID':req.decoded},function (err,user) {
        if(err) throw err;
        if(user){
            type = user.type;
            id = user.UserID;
        }else{
            res.json({"status": "请求的用户不存在"});
        }
    });
    
    var data={
        status: 1,
        type: type,
        own: null,
        teacher: null,
        student: null
        /*
        publishAssignment: null,
        scheduleAssignment: null,
        dueAssignment: null
        */
    };
    /*
    var count_1 = new Array();
    var count_2 = new Array();
    var count_3 = new Array();
    */

    if(type === "teacher"){
        Classrooms.find({'own': id}, function(err, classroom) {
            if(err) throw err;
            data.own = classroom;
        });
        Classrooms.find({'teacher': id}, function(err, classroom) {
            if(err) throw err;
            data.teacher = classroom;
        });
        /*
        for(var a in data.own) {
            Assignments.find({'classroomID': a},{'assignmentID': true, 'type': true}, function (err, assignment) {
                if(err) throw err;
                if(assignment) {
                    for(var obj in assignment) {
                        if(obj.type === 'publish') {
                            count_1.push(assignment.assignmentID);
                        } else if(obj.type === 'scheduled') {
                            count_2.push(assignment.assignmentID);
                        } else if(obj.type === 'due') {
                            count_3.push(assignment.assignmentID);
                        };
                    }
                }
            });
        }
        for(var b in data.teacher) {
            Assignments.find({'classroomID': b},{'assignmentID': true, 'type': true}, function (err, assignment) {
                if(err) throw err;
                if(assignment) {
                    for(var obj in assignment) {
                        if(obj.type === 'publish') {
                            count_1.push(assignment.assignmentID);
                        } else if(obj.type === 'scheduled') {
                            count_2.push(assignment.assignmentID);
                        } else if(obj.type === 'due') {
                            count_3.push(assignment.assignmentID);
                        };
                    }
                }
            })
        }
        */
    }else{
        data.teacher = false;
         Classrooms.find({'student': id}, function(err, classroom) {
            if(err) throw err;
            data.student = classroom;
        });
        /*
        for(var a in data.student) {
            Assignments.find({'classroomID': a},{'assignmentID': true, 'type': true}, function (err, assignment) {
                if(err) throw err;
                if(assignment) {
                    for(var obj in assignment) {
                        if(obj.type === 'publish') {
                            count_1.push(assignment.assignmentID);
                        } else if(obj.type === 'scheduled') {
                            count_2.push(assignment.assignmentID);
                        } else if(obj.type === 'due') {
                            count_3.push(assignment.assignmentID);
                        };
                    }
                }
            })
        }
        */
    };

    //do not know if this works
    Assignments.update(
        {'type': "schedule", 'scheduleDate': myDate},
        {'scheduleDate': null, 'type': "publish"},{multi: true}, function (err) {
            if(err) throw err;
        });
    Assignments.find({},{'assignmentID': true, 'dueDate': true, 'type': true}, function (err, assignment) {
        if(err) throw err;
        if(assignment) {
            for(var obj in assignment) {
                if(obj.dueDate != null && obj.dueDate < myDate && obj.type != "due") {
                    Assignments.update(
                        {'assignmentID': assignment.assignmentID},
                        {'type': "due", 'dueDate': null, 'scheduleDate': null}, function (err) {
                            if(err) throw err;
                        }
                    )
                }
            }
        }
    });
    res.json({"status": "1", "data":data});
};