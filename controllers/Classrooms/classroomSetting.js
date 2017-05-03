var Classrooms = require('../../models/ClassroomsModel');
var User = require('../../models/UserModel');

var isOwner = function(decoded,Classrooms,classroomID) {
    Classrooms.findOne({'classroomID':classroomID},function(err,classroom) {
        if(err) throw err;
        if(classroom){
            if(classroom.owner === decoded) {
                return {'boo':'isOwner','classroom':classroom};
            }else if(classroom.teacher.contains(decoded)){
                return {'boo':'isTeacher','classroom':classroom};
            }else{
                return 'userNoPower';
            }
        }else{
            return 'noSuchClassroom';
        }
    });
};

exports.updateClassroomSetting = function(req,res) {
    var ret = isOwner(req.decoded,Classrooms,req.body.classroomID);
    if(ret.boo === 'isOwner' || ret.boo === 'isTeacher'){
        ret.classroom.allowToEnter = req.body.allowToEnter;
        ret.classroom.allowToLeave = req.body.allowToLeave;
        ret.classroom.name = req.body.name;
        ret.classroom.description = req.body.description;
        res.json({"status": "updateClassroomSetting success"});
    }else{
        res.json({"status":ret})
    }
};

exports.updateEnter = function(req,res) {
    var ret = isOwner(req.decoded,Classrooms,req.body.classroomID);
    if(ret.boo === 'isOwner' || ret.boo === 'isTeacher'){
        ret.classroom.allowToEnter = !ret.classroom.allowToEnter;
        res.json({"status": "updateEnter success"});
    }else{
        res.json({"status":ret})
    }
};

exports.updateLeave = function(req,res) {
    var ret = isOwner(req.decoded,Classrooms,req.body.classroomID);
    if(ret.boo === 'isOwner' || ret.boo === 'isTeacher'){
         ret.classroom.allowToLeave = !ret.classroom.allowToLeave;
         res.json({"status": "updateLeave success!"});
    }else{
        res.json({"status":ret})
    }
};

exports.deleteClassroom = function(req,res) {
    var ret = isOwner(req.decoded,Classrooms,req.body.classroomID);
    if(ret.boo === 'isOwner'){
        ret.classroom.remove();
        res.json({"status": "Delete success"});
    } else if(ret.boo === "isteacher") {
        res.json({"status": "userNoPower"});
    } else {
        res.json({"status": ret})
    };
};

exports.transferOwnership = function(req,res) {
    var result = isOwner(req.decoded,Classrooms,req.body.classroomID);
    if(result.boo === "isOwner") {
        result.cla.owner = req.body.transferedOwner;
        result.cla.teacher.push(req.decoded);
        res.json({"status": "transfer success"});
    } else if(result.boo === "isteacher") {
        res.json({"status": "userNoPower"});
    } else {
        res.json({"status": result})
    };
};

exports.kickTeacher = function(req,res) {
    var result = isOwner(req.decoded,Classrooms,req.body.classroomID);
    if(result.boo === "isOwner") {
        
    }
}