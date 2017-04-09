const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	subject: {
		type: String
	},
	body: {
		type: String
	}
});

const Comment = mongoose.model('Comment', CommentSchema);


module.exports = Note;