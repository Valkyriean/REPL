/**
 * Created by Li on 2017/4/14.
 */
var Classrooms = require('../../models/ClassroomsModel');
var Users = require('../../models/UserModel');

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
