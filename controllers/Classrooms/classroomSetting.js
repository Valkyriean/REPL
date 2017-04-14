var Classrooms = require('../../models/ClassroomsModel');
var User = require('../../models/UserModel');

exports.updateClassroomSetting = function(req,res) {
    Classrooms.findOne({'classroomID':req.body.classroomID},function(err,classroom) {
        if(err) throw err;
        if(classroom){
            if(classroom.owner === req.decoded || classroom.teacher.contains(req.decoded)) {
                classroom.allowToEnter = req.body.allowToEnter;
                classroom.allowToLeave = req.body.allowToLeave;
                classroom.name = req.body.name;
                classroom.description = req.body.description;
            }else{
                req.json({"status":"用户无权限"});
            }
        }else{
            res.json({"status": "请求的classroom不存在"});
        }
    });
};



