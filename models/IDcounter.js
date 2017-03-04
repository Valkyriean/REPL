var mongoose = require('mongoose');

var IDcounterModel = new mongoose.Schema({
        model: String,
        id: { type: Number, default: 1 }
});

var IDcounter=mongoose.model('IDcounter', IDcounterModel);

exports.nextID = function(model){
    IDcounter.find({"model":model},function(err, data){
        if(err){ throw(err); }
        
        if(data == null){
            IDcounter.create({model:model,id:1}, function(err,number){
                if(err) { throw(err); }
                return number.id;
            });
        }else{
            IDcounter.findOneAndUpdate({"model": model}, { $inc: { nextSeqNumber: 1 } }, {new: true}, function(err,number){
                if(err) { throw(err); }
                return number.id;
            });
        }
    });
}