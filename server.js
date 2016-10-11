var express = require('express');

var app = express();

//Setting the template engine
app.set('view engine', 'pug');

app.use(express.static('public'));

//Some routes!
app.get('/', function(req, res){
	res.render('index', { title : 'Platzigram' });
});

//Some routes!
app.get('/signup', function(req, res){
	res.render('index', { title : 'Platzigram - Signup' });
});

app.get('/signin', function(req, res){
	res.render('index', { title : 'Platzigram - Signin' });
});

//Midlewares
app.get('/api/pictures', function(req, res){

	var pictures = [
		{
			user: {
				username: 'hecto932',
				avatar: 'https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-9/13932906_10209466870125352_8105519068024466359_n.jpg?oh=7be84bffe8b86f0a3ba67bcaf246c2e9&oe=58A9A0B2'
			},
			url: 'office.jpg',
			likes: 0,
			liked: false,
			createdAt: new Date().getTime()
		},
		{
			user: {
				username: 'hecto932',
				avatar: 'https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-9/13932906_10209466870125352_8105519068024466359_n.jpg?oh=7be84bffe8b86f0a3ba67bcaf246c2e9&oe=58A9A0B2'
			},
			url: 'office.jpg',
			likes: 1,
			liked: true,
			createdAt: new Date().setDate(new Date().getDate() - 10)
		}
	];

	setTimeout(function() {
		res.send(pictures);
	}, 2000)
})

app.listen(3000, function(err){
	if(err) return console.log("Hubo un error"), process.exit(1);
	console.log("Escuchando en el puerto 3000");
});