/**
 * Created by phant on 2017/5/31.
 */
var IDcounter = require('../models/IDcounter');

module.exports  = exports =function counterPlugin (schema,options) {
	schema.pre('save', function(next,done) {
		var self = this;
		if (this.isNew) {
			IDcounter.nextID(options.model).next(function (nextID) {
				self[options.modelID] = nextID;
				next();
			});
		} else {
			next();
		}
	});
};
