var mongoose = require('mongoose');

var IDcounterModel = new mongoose.Schema({
        model: String,
        id: { type: Number, default: 1 }
});

var IDcounter=mongoose.model('IDcounter', IDcounterModel);

exports.nextID = function(model){
    return{
        next: function(callback){
            IDcounter.find({"model":model},function(err, data){
                if(err) { throw(err); }
                if(data.length<1){
                    IDcounter.create({model:model,id:1}, function(err,number){
                        if(err) { throw(err); }
                        callback(number.id);
                    });
                }else{
                    IDcounter.findOneAndUpdate({"model": model}, { $inc: { id: 1 } }, {new: true}, function(err,number){
                        if(err) { throw(err); }
                        callback(number.id);
                    });
                }
            });
        }
    };
};