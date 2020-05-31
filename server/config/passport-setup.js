const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users')
const keys = require('./keys.js')
const bcrypt = require('bcrypt');
passport.use(new GitHubStrategy({
    clientID: keys.github_strategy.clientID,
    clientSecret: keys.github_strategy.client_secret,
    callbackURL: keys.github_strategy.callbackURL
}, (accessToken, refreshToken, profile, done) => {
    //check if user already exists
    User.findOne({ githubId: profile.id }).then(currentUser => {
        if (currentUser) {
            //if user exists, pass
            done(null, currentUser)
        } else {
            new User({
                login: profile.username,
                githubId: profile.id,
                avatar_url: profile.photos[0].value,
                githubUrl: profile.profileUrl,
                name: profile.displayName
            }).save().then(newUser => {
                done(null, newUser)
            })
        }
    }).catch(err => {
        console.log('ERROR: ', err)
    })
}
));

passport.use('local-signup', new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
}, (req, email, password, done) => {
    bcrypt.hash(password, 10, (err, hash) => {
        if(err) return err;
        new User({
            login: email,
            password: hash,
            name: req.body.name
        }).save().then(newUser => {
            return done(null, newUser)
        })
    })

}));

passport.use('local-login',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
},
(req, email, password, done) => {

    User.findOne({ email: email.toLocaleLowerCase() }, (err, user) => {
        if(err){
            console.log("there's an error!");
            throw err;
        }

        if(!user){
            return done(null, false)
        } 

        
        if(user){
            bcrypt.compare(password, user.password, (err, res) => {
                if(err) return done(err);

                if(res == true){
                    console.log('signing in');
                    return done(null, user);
                } else{
                    console.log('wrong password');
                    return done(null, false);
                }
            })

        }
    }), 
    (err, user) => {
        return done(err, user);
    }
}
));



passport.serializeUser((user, done) => {
    done(null, user._id);
})


passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user)
    }).catch(err => {
        console.log(err)
    })
    // done(null,user)
});

