/**
 * Created by phant on 2017/5/31.
 */

exports.counterPlugin = function (schema,model) {
	var IDcounter = require('../models/IDcounter').nextID(model);
	schema.pre('save', function(next,done) {
		var self = this;
		if (this.isNew) {
			IDcounter.next(function (nextID) {
				self.UserID = nextID;
				next();
			});
		} else {
			next();
		}
	});
};
