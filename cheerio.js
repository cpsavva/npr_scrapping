const request = require('request');
const cheerio = require('cheerio');


module.exports = function(app) {

    app.get('/scrape', function(req, res) {

        request('http://www.npr.org/sections/news/', function(error, response, html) {
            var $ = cheerio.load(html);

            var result = [];


            $('article.item').each(function(i, element) {
                var link = $(element).find('a').attr('href');
                var title = $(element).find('h2.title').text();
                var teaser = $(element).find('p.teaser').text();


                result.push({
                    title: title,
                    teaser: teaser,
                    link: link,
                });

            })
            // console.log(result);
            res.render('scrape', {scrape_data: result});
        })
        
    })
};