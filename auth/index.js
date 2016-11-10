var LocalStrategy = require('passport-local').Strategy;
var platzigram = require('platzigram-client')
var config = require('../config')

var client = platzigram.createClient(config.client);

exports.localStrategy = new LocalStrategy((username, password, done) => {
  client.auth(username, password, (err, token) => {
    console.log(username + " " + password);
    if (err) {
      console.log("Username and password not found!");
      console.log(err.message);
      return done(null, false, { message: 'username and password not found' })
    }

    client.getUser(username, (err, user) => {
      if (err) {
        return done(null, false, { message: `an error ocurred: ${err.message}` })
      }

      user.token = token
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
    if (err) return done(err)

    usr.token = user.token
    done(null, usr)
  });
}