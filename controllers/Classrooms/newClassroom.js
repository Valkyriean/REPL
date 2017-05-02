var Classrooms = require('../../models/ClassroomsModel');
var a = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9"];


var generateJoinCode = function() {
    var joinCode = String;
    for (var i=0; i<4; i++){
        var randNumber = Math.round(Math.random() * 36 + 1);
        joinCode += a[randNumber];
    }
    return joinCode;
};

exports.newClassroom = function(req, res) {
    var joinCode = generateJoinCode();
    var condition = true;
    while(condition) {
        Classrooms.findOne({'joinCode':joinCode},function(err,classroom){
            if(err) throw err;
            if(classroom){
                joinCode = generateJoinCode();
            } else {
                condition = false;
            }
        });
    }
    var data = {
        owner: req.decoded,
        teacher: null,
        student: null,
        name: req.body.name,
        description: req.body.description,
        programLanguage: req.body.programLanguage,
        joinCode: joinCode
    };
    var newClassroom = new Classrooms(data);
    newClassroom.save(function(err) {
        if (err) {
            res.json({"status": "classroom save failed for no reason"});
        }else{
            console.log('Classroom saved successfully!');
            res.json({"status": 1});
        }
    });
};

exports.cloneClassrooms = function(req, res) {
    var joinCode = generateJoinCode();
    var condition = true;
    while(condition) {
        Classrooms.findOne({'joinCode':joinCode},function(err,classroom){
            if(err) throw err;
            if(classroom){
                joinCode = generateJoinCode();
            } else {
                condition = false;
            }
        });
    }
    var data = {
        owner: req.decoded,
        teacher: null,
        student: null,
        name: req.body.name + "clone",
        description: req.body.description,
        programLanguage: req.body.programLanguage,
        joinCode: joinCode
    }
    var newClassroom = new Classrooms(data);
    newClassroom.save(function(err) {
        if (err) {
            res.json({"status": "classroom save failed for no reason"});
        }else{
            console.log('Classroom saved successfully!');
            res.json({"status": 1});
        }
    });
}