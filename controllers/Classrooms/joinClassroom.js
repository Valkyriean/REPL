/**
 * Created by Li on 2017/4/14.
 */
var Classrooms = require('../../models/ClassroomsModel');
var Users = require('../../models/UserModel');
var Assignments = require('../../models/AssignmentModel');

var newStudentWorks = function (studentID) {
    var studentWork = {
        'studentID': studentID,
        'status': "unfinished",
        'code': null,
        'comment': null
    };
    return studentWork;
};

exports.joinClasses = function(req,res){
	Classrooms.findOne({'joinCode':req.body.joinCode},function(err,classroom) {
		if(err) throw err;
		if(classroom) {
			if(classroom.allowToEnter) {
				Users.findOne({'userID':req.decoded},function(err,user){
					if(err) throw err;
					if(classroom.owner === req.decoded || classroom.teacher.contains(req.decoded) || classroom.student.contains(req.decoded)){
						res.json({'status':'already in there'})
					}
					//owner can not join his own classroom as a teacher
					if(user){
						 if(user.type === 'student'){
							classroom.student.add(user.userID);
							Assignments.find({'classroomID': classroom.classroomID, 'type': "publish"}, {'assignmentID': true, "student": true}, function (err, assignments) {
                                 if(err) throw err;
                                 if(assignments) {
                                 	var studentWorks
                                 	for(var obj in assignments) {
                                 		studentWorks = obj.studentWorks.push(newStudentWorks(req.decoded));
										Assignments.update({'assignmentID': obj.assignmentID},{'studentWorks': studentWorks}, function (err) {
											if(err) throw err;
										})
									}
                                 }
                             })
						}else {
							classroom.teacher.add(user.userID);
						 };


					}else{
						res.json({'status':'用户不存在'});
					};
				});
			} else {
				res.json({"status": "not allow to enter"})
			};
		} else {
			res.json({'status':'JoinCode不存在'});
		};
	});
};
