//model/messages.js
'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
	recipient_group: [{ group_id: Schema.Types.ObjectId, event_id: Schema.Types.ObjectId}],
	messages: [{ message: String }]
});

module.exports = mongoose.model('Message', messageSchema);
