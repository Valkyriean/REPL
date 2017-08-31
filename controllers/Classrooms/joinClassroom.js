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

var alreadyThere = function(arr,id){
    for(x in arr){
        if(x===id){
            return true;
        }
    }
    return false;
}

exports.joinClasses = function(req,res){
	Classrooms.findOne({'joinCode':req.body.joinCode},function(err,classroom) {
		if(err) throw err;
		if(classroom) {
			if(classroom.allowToEnter) {
				Users.findOne({'userID':req.decoded},function(err,user){
					if(err) throw err;
                    console.log(classroom);

                    console.log(typeof(classroom.student));
                    var stu = new Array();
                    stu = classroom.student;
                    console.log(typeof(stu));
                    console.log(stu);

                    if(classroom.owner === req.decoded || alreadyThere(classroom.teacher,req.decoded)||alreadyThere(classroom.student,req.decoded)){
						res.json({'status':'already in there'})
					}
					//owner can not join his own classroom as a teacher
					if(user){
						 if(user.type === 'student'){
							classroom.student.push(user.userID);
							Assignments.find({'classroomID': classroom.classroomID, 'type': "publish"}, {'assignmentID': true, "student": true}, function (err, assignments) {
                                 if(err) throw err;
                                 if(assignments) {
                                 	var studentWorks;
                                 	for(var obj in assignments) {
                                 		studentWorks = obj.studentWorks.push(newStudentWorks(req.decoded));
										Assignments.update({'assignmentID': obj.assignmentID},{'studentWorks': studentWorks}, function (err) {
											if(err) throw err;
											res.json({'status': 'success'});
										});
									}
                                 }
                             });
							 res.json({'status': 'success'});
						}else {
							classroom.teacher.add(user.userID);
							res.json({'status': 'success'});
						 };


					}else{
                        //user not found
						res.json({'status':'ユーザーが見つからない'});
					};
				});
			} else {
                //classroom are closed
				res.json({"status": "教室は開放的でない"})
			};
		} else {
            //Jcode does not exist
			res.json({'status':'Jcode存在しない'});
		};
	});
};
