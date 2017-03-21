var Classrooms = require('../../models/ClassroomsModel');
var jwt = require('jsonwebtoken');
var secretKey = require('../../Strings').secretKey;

exports.postDashboard = function(req,res){
    var data={
        status: 20,
        type:req.user.type,
        teacher:null,
        own:null,
        student:null
    };

    if(req.user.type === "teacher"){
        Classrooms.findOne({'own': req.user.userID}, function(err, classroom) {
            if(err) throw err;
            data.own = classroom;
        });
        
        Classrooms.find({'teacher': req.user.userID}, function(err, classroom) {
            if(err) throw err;
            data.teacher = classroom;
        });

    }else{
        data.teacher = false;
         Classrooms.find({'student': req.user.userID}, function(err, classroom) {
            if(err) throw err;
            data.student = classroom;
        });
    }
    res.json(data);
};