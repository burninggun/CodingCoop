const router = require('express').Router();
const passport = require('passport');
const Users = require('../models/users')

router.get('/check', (req, res)=> {
    let authenticated = null;
    if (req.isAuthenticated()) {
        authenticated = true;

    } else {
        authenticated = false;
    }

    
    res.send({authenticated});
});

router.post('/register', (req, res, next) => {
    const { email, password, name } = req.body
    Users.findOne({login: email}).then(currentUser => {
        if(currentUser){
            return res.send({success: false})
        } else {
            passport.authenticate('local-signup', (err, user, info) => {
                req.login(user, err => {
                    return res.send({ success: req.isAuthenticated() })
                })
            })(req, res, next)
        }
    })

})

router.post('/login', (req, res, next) => {
	passport.authenticate('local-login', (err, user, info) => {
		if (err) return next(err);
		if (!user) return res.send({ success: req.isAuthenticated() });
		req.logIn(user, err => {
			if(err) return next(err);
			return 	res.send({ success: req.isAuthenticated() });

		})
	})(req, res, next)
})

router.get('/github', passport.authenticate('github'));

router.get('/error', (req,res)=>{
    res.send('there was an error')
});

router.get('/logout', (req,res)=>{
    req.logout()
    req.session.destroy( () => {
        res.redirect('/home/newest');  
    } )
});


router.get('/callback',passport.authenticate('github') , (req,res) => {
        // res.send(req.user)
        res.redirect('/home/newest')
    }
);



module.exports = router

