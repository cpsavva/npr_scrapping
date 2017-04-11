const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const NewsPostSchema = new Schema({

	title: {
		type: String,
		required: true
	},
	teaser: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true
	},

	comment: [{
		type: Schema.Types.ObjectId,
		ref: 'Comment'
	}]
})

const NewsPost = mongoose.model('NewsPost', NewsPostSchema);


module.exports = NewsPost;