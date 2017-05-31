var Classrooms = require('../../models/ClassroomsModel');
var Users = require('../../models/UserModel');

exports.leaveClassroom = function(req, res) {
    Classrooms.findOne({'classroomID': req.body.classroomID}, function(err,classroom){
        if(err) throw err;
        if(classroom) {
            Users.findOne({'userID': req.decoded}, function(error,user) {
                if(error) throw error;
                if(user) {
                    if(user.type === "student") {
                        if(classroom.allowToLeave) {
                            var a = classroom.student.indexof(req.decoded);
                            classroom.student.splice(a, 1);
                            res.json({'status': "success"});
                        } else {
                            res.json({'status': "cannot leave"});
                        };
                    } else if(user.type === "teacher") {
                        if(classroom.teacher.contains(req.decoded)) {
                            var b = classroom.teacher.indexof(req.decoded);
                            classroom.student.splice(b, 1);
                            res.json({'status': "success"});
                        } else {
                            res.json({'status': "cannot leave"});
                        };
                    };
                } else {
                    res.json({'status': "token does not exist"});
                };
            });
        } else {
            res.json({'status': "classroom does not exist"});
        };
    });
};