var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var header = require('../header');
var request = require('superagent');
var axios = require('axios');

page('/', header, loadPicturesAxios, function(ctx, next){
	
	title('Platzigram');

	var main = document.getElementById('main-container');
	empty(main).appendChild(template(ctx.pictures));
});

//ctx nos permite guardar datos mediante los middlewares
function loadPictures(ctx, next){
	request
		.get('/api/pictures')
		.end(function(err, res){
			if(err) return console.log(err);

		 	ctx.pictures = res.body;
		 	next();
		});
}

function loadPicturesAxios(ctx, next){
	axios
		.get('/api/pictures')
		.then(function(res){
			ctx.pictures = res.data;
			next();
		})
		.catch(function(err){
			console.log(err);
		});
}