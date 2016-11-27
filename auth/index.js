var LocalStrategy = require('passport-local').Strategy;
var platzigram = require('platzigram-client')
var config = require('../config')

var client = platzigram.createClient(config.client);

exports.localStrategy = new LocalStrategy((username, password, done) => {
  client.auth(username, password, (err, token) => {
    if (err) {
      console.log(err.message);
      return done(null, false, { message: 'username and password not found' })
    }
    console.log('NO HAY ERROR!');
    client.getUser(username, (err, user) => {
      if (err) {
        console.log(err.message);
        return done(null, false, { message: `an error ocurred: ${err.message}` })
      }

      user.token = token
      console.log(user);
      return done(null, user)
    })
  })
});

exports.serializeUser = function (user, done) {
  done(null, {
    username: user.username,
    token: user.token
  });
}

exports.deserializeUser = function (user, done) {
  client.getUser(user.username, (err, usr) => {
    if (err) {
      console.log('ERROR!!');
      console.log(err.message);
      console.log('ERROR!!');
      return done(err)
    }

    usr.token = user.token
    done(null, usr)
  });
}