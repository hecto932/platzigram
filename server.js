'use strict';

var express = require('express');
var aws = require('aws-sdk');
var multer  = require('multer');
var multerS3 = require('multer-s3');
var ext = require('file-extension');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var passport = require('passport');
var config = require('./config');
var port = process.env.PORT || 3000;

//Storage multerS3

console.log(config.aws);

var s3 = new aws.S3({
  accessKeyId: config.aws.accessKey,
  secretAccessKey: config.aws.secretKey
});

var storage = multerS3({
  s3: s3,
  bucket: 'platzigram-hector',
  acl: 'public-read',
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname })
  },
  key: function (req, file, cb) {
    cb(null, +Date.now() + '.' + ext(file.originalname))
  }
});
 
var upload = multer({ storage: storage }).single('picture');

var app = express();

app.set(bodyParser.json()) // Cualquier peticion con el JSON llega al body serializado
app.use(bodyParser.urlencoded({ extended: false })) // Recibe los parametros de un request de un formulario
app.use(cookieParser());
app.use(expressSession({
  secret: config.secret,
  resave: false,
  saveUnitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

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
			likes: 0,
			liked: true,
			createdAt: new Date().setDate(new Date().getDate() - 10)
		}
	];

	setTimeout(() => res.send(pictures) , 2000);
});

app.post('/api/pictures', function (req, res) {
  	upload(req, res, function (err) {
    	if (err) {
      		return res.send(500, "Error uploading file");
    	}
    	res.send('File uploaded');
  	})
})

app.get('/api/user/:username', (req, res) => {
  const user = {
    username: 'platzi',
    avatar: 'https://igcdn-photos-b-a.akamaihd.net/hphotos-ak-xpa1/t51.2885-19/11351571_102153813463801_2062911600_a.jpg',
    pictures: [
      {
        id: 1,
        src: 'https://igcdn-photos-e-a.akamaihd.net/hphotos-ak-xaf1/t51.2885-15/s640x640/sh0.08/e35/c135.0.810.810/13129218_1692859530968044_751360067_n.jpg?ig_cache_key=MTI0MjIzMTY4MzQ5NzU1MTQxOQ%3D%3D.2.c',
        likes: 3
      },
      {
        id: 2,
        src: 'https://igcdn-photos-d-a.akamaihd.net/hphotos-ak-xaf1/t51.2885-15/e35/13126768_259576907723683_861119732_n.jpg?ig_cache_key=MTIzODYzMjE4NDk1NDk3MTY5OQ%3D%3D.2',
        likes: 1
      },
      {
        id: 3,
        src: 'https://igcdn-photos-d-a.akamaihd.net/hphotos-ak-xfa1/t51.2885-15/s640x640/sh0.08/e35/13118139_1705318183067891_1113349381_n.jpg?ig_cache_key=MTI0MTQwNzk1ODEyODc0ODQ5MQ%3D%3D.2',
        likes: 10
      },
      {
        id: 4,
        src: 'https://igcdn-photos-g-a.akamaihd.net/hphotos-ak-xaf1/t51.2885-15/e35/12940327_1784772678421526_1500743370_n.jpg?ig_cache_key=MTIyMzQxODEwNTQ4MzE5MjE4OQ%3D%3D.2',
        likes: 0
      },
      {
        id: 5,
        src: 'https://igcdn-photos-a-a.akamaihd.net/hphotos-ak-xpt1/t51.2885-15/e35/11934723_222119064823256_2005955609_n.jpg?ig_cache_key=MTIyMzQwOTg2OTkwODU2NzY1MA%3D%3D.2',
        likes: 23
      },
      {
        id: 6,
        src: 'https://igcdn-photos-a-a.akamaihd.net/hphotos-ak-xaf1/t51.2885-15/e35/12904985_475045592684864_301128546_n.jpg?ig_cache_key=MTIyMzQwNjg2NDA5NDE2MDM5NA%3D%3D.2',
        likes: 11
      }
    ]
  }
  res.send(user);
  
})

app.get('/:username', function (req, res) {
  res.render('index', { title: `Platzigram - ${req.params.username}` });
})

app.get('/:username/:id', function (req, res) {
  res.render('index', { title: `Platzigram - ${req.params.username}` });
})

app.listen(port, function(err){
	if(err) return console.log("Hubo un error"), process.exit(1);
	console.log(`Escuchando en el puerto ${port}`);
});