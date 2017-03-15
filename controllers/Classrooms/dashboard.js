var Classrooms = require('../../models/ClassroomsModel');

exports.postDashboard = function(req,res,next){
    var data={
        token:null,
        isTeacher:false,
        teacher:null,
        own:null,
        student:null

    };
    if(req.token != null){
        data ={token:req.toekn};
    }
    
    if(req.user.teacher){
        data.isTeacher = true;
        
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