const NewsPost = require('../models/NewsPost.js');
const Comment = require('../models/Comment.js');


module.exports = function(app){


/*add note to article*/

	app.post('/saved/:id', function(request, response){
		console.log(request.body.body);
		var comment = {};
		comment.body = request.body.body

		var newComment = new Comment(comment);

		newComment.save(function(error, doc){
			console.log('doc ' + doc)
			if(error){
				console.log(error);
			}
			else{
				NewsPost.updateOne({'_id': request.params.id}, {$push: {'comment': doc._id}})
				.exec(function(error, doc){
					if (error){
						console.log(error);
					}
					else{
						console.log('added note!');
						// response.render('saved', {comment_data: doc});
						response.redirect('/saved');
					}
				})
			}
		})
 
	})

	/*delete comment*/
	app.delete('/comment/:id', function(request, response){
		console.log('trying to delete');
		console.log(request.params.id);
		
		Comment.deleteOne({
			'_id': request.params.id
		}, function(error){
			if (error){
				console.log(error);
			}
			else{
				console.log('removed!');
			}
		})
		response.redirect('/saved');
	})



}