var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');

page('/', function(ctx, next){
	title('Platzigram');
	var main = document.getElementById('main-container');
	var pictures = [
		{
			user: {
				username: 'hecto932',
				avatar: 'https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-9/13932906_10209466870125352_8105519068024466359_n.jpg?oh=7be84bffe8b86f0a3ba67bcaf246c2e9&oe=58A9A0B2'
			},
			url: 'office.jpg',
			likes: 10,
			liked: true
		},
		{
			user: {
				username: 'hecto932',
				avatar: 'https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-9/13932906_10209466870125352_8105519068024466359_n.jpg?oh=7be84bffe8b86f0a3ba67bcaf246c2e9&oe=58A9A0B2'
			},
			url: 'office.jpg',
			likes: 2,
			liked: true
		}
	];
	empty(main).appendChild(template(pictures));
})