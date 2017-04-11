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
			console.log(doc[0].comment[0])
			if (error){
				console.log(error)
			}
			else{
				response.render('saved', {saved_data: doc});
			}
		})

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