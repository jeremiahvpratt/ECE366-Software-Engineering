//model/groups.js
'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = new Schema({
	name: String,
	events: [{
		_id: Schema.Types.ObjectId,
		name: String,
		date: String,
		time: String,
		loc: String,
		attendees: [{ _id: Schema.Types.ObjectId }],
		description: String,
	}],
	description: String,
	img: String
});

module.exports = mongoose.model('Group', groupSchema);
