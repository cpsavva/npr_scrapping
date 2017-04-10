/*Require Models */
const NewsPost = require('../models/NewsPost.js');
const Comment = require('../models/Comment.js');


module.exports = function(app){

	/*create and save articles*/
	app.post('/save', function(request, response){
		console.log(request.body)

		var post = {};

		post.title = request.body.title;
		post.teaser = request.body.teaser;
		post.link = request.body.link;


		var entry = new NewsPost(post);

		entry.save(function(err, doc){
			if (err) {
				console.log(err)
			}
			else {
			console.log('saved!')
		}
		})

		response.redirect('/scrape')
	})


/*display all saved articles */

	app.get('/saved', function(request, response){

		NewsPost.find({})
		.populate('comment')
		.exec(function(error, doc){
			console.log(doc)
			if (error){
				console.log(error)
			}
			else{
				response.render('saved', {saved_data: doc});
			}
		})

	})

/*display all comments */
	// app.get('/comments', function(request, reponse){
	// 	Comment.find({}, function(error, doc){
	// 		if (error){
	// 			console.log(error)
	// 		} 
	// 		else{
	// 			response.render('saved', {comment_data: doc})
	// 		}

	// 	})
		
	// })

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
				NewsPost.findOneAndUpdate({'_id': request.params.id}, {'comment': doc._id})
				.exec(function(error, doc){
					if (error){
						console.log(error);
					}
					else{
						console.log('added note!');
						// response.render('saved', {comment_data: doc});
					}
				})
			}

		})

		response.redirect('/saved')
	})


	app.delete('/:id', function(request, response){
		// console.log('trying to delete');
		// console.log(request.params.id);
		NewsPost.remove({
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