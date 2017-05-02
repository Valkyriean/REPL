var Classrooms = require('../../models/ClassroomsModel');
var jwt = require('jsonwebtoken');
var secretKey = require('../../Strings').secretKey;
var User = require('../../models/UserModel');

exports.postDashboard = function(req,res){
    User.findOne({"userID": req.decoded},function(err,user){
        if(err) throw err;
        if(user){
             var data={
                status: 1,
                type:user.type,
                teacher:null,
                own:null,
                student:null
            };

            if(user.type === "teacher"){
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
        }else{
            res.json({"status": "找不到这个用户"});
        }
    });
};