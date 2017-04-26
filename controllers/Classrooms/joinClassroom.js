/**
 * Created by Li on 2017/4/14.
 */
var Classrooms = require('../../models/ClassroomsModel');
var User = require('../../models/UserModel');

exports.joinClasses = function(req,res){
	Classrooms.findOne({'joinCode':req.body.joinCode},function(err,classroom) {
		if(err) throw err;
		if(classroom){
			User.findOne({'userID':req.decoded},function(err,user){
				if(err) throw err;
				if(user){
					 if(user.type === 'student'){
					 	classroom.student.add(user.userID);
					 }else {
						 classroom.teacher.add(user.userID);
					 }
				}else{
					res.json({'status':'用户不存在'});
				}
			});
		}else{
			res.json({'status':'Jcode不存在'});
		}
	});
};
