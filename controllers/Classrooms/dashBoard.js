var Classrooms = require('../../models/ClassroomsModel');
var jwt = require('jsonwebtoken');
var secretKey = require('../../Strings').secretKey;
var User = require('../../models/UserModel');


exports.postDashboard = function(req,res){
    var type;
    var id;
    User.findOne({'userID':req.decoded},function (err,user) {
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
    };

    if(type === "teacher"){
        Classrooms.find({'own': id}, function(err, classroom) {
            if(err) throw err;
            data.own = classroom;
        });
        
        Classrooms.find({'teacher': id}, function(err, classroom) {
            if(err) throw err;
            data.teacher = classroom;
        });

    }else{
        data.teacher = false;
         Classrooms.find({'student': id}, function(err, classroom) {
            if(err) throw err;
            data.student = classroom;
        });
    }
    res.json({"status": "1", "data":data});
};