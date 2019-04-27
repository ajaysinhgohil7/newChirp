var LocalStrategy = require("passport-local").Strategy;
var bCrypt = require("bcrypt");
//temporary data store
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = function(passport) {
  // Passport needs to be able to serialize and deserialize users to support persistent login sessions
  passport.serializeUser(function(user, done) {
    // console.log("serializing user:", user);
    //return the unique id for the user
    return done(null, user._id);
  });

  //Desieralize user will call with the unique id provided by serializeuser
  passport.deserializeUser(function(id, done) {
    // console.log('desirealizing user' + id);
    User.findById(id, function (err, user) {
      if(err){
        return done(err, false);
      }
      if(!user){
        return done('user not found', false);
      }      
      return done(user, true);
    });
  });


  
  passport.use(
    "signup",
    new LocalStrategy(
      {
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      function(req, username, password, done) {
        console.log(username);
        User.findOne({username: username}, function (err, user) {

          if(err){
            return done(err, false);
          }

          if(user){
            console.log('User already taken');
            return done(null, false)
          }
          //store user in database
          let newUser = new User();
          newUser.username = username;
          newUser.password = createHash(password);
          newUser.save(function (err) {
            if(err){
              return done(err,false);
            }
            console.log('Successfully registered user');
            return done(null, newUser);
          });
        });
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {
        passReqToCallback: true
      },
      function(req, username, password, done) {
        User.findOne({username: username}, function (err, user) {
          console.log(user);
          if(err){
            return done(err, false);
          }
          if(!user){
            console.log("username not found")
            return done(null, false);
          }
          if (!isValidPassword(user, password)) {
            console.log("Invalid password");
            return done(null, false);
          }
          return done(null, user);
        });        
      }
    )
  );

  var isValidPassword = function(user, password) {
    return bCrypt.compareSync(password, user.password);
  };
  // Generates hash using bCrypt
  var createHash = function(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  };
};
