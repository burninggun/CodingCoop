const passport = require ('passport');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/users')
const keys = require('./keys.js')

passport.use(new GitHubStrategy({
    clientID: keys.github_strategy.clientID,
    clientSecret: keys.github_strategy.client_secret,
    callbackURL: keys.github_strategy.callbackURL
    },(accessToken, refreshToken, profile, done) => {
        //check if user already exists
        User.findOne({githubId:profile.id}).then( currentUser => {
            if (currentUser){
                //if user exists, pass
                done(null, currentUser)
            } else {
                new User({
                    login: profile.username,
                    githubId: profile.id,
                    avatar_url: profile.photos[0].value,
                    githubUrl: profile.profileUrl,
                    name: profile.displayName
                }).save().then( newUser=>{
                    done(null, newUser)
                })
            }
        } ).catch(err => {
            console.log('ERROR: ', err)
        })
    }
));  



passport.serializeUser( (user,done) => {
    done(null,user.id);
})


passport.deserializeUser( (id,done) => {
    User.findById(id).then(user => {
        done(null, user)
    }).catch(err =>{
        console.log(err)
    })
    // done(null,user)
});

