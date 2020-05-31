module.exports = {
    github_strategy: {
        clientID: "8fa59b3a6a90a8734cee", //insert your github OAUTH ID here
        client_secret: "713d49a34001cc2ed952ad94b4b9656d0f198ded",
        callbackURL: "http://localhost:3000/auth/callback"
    },
    session: {
        cookieKey: 'asdfasdf' //some random key for authentication,
    },
    mongoURI: "mongodb://burninggun:khalid123505@ds015700.mlab.com:15700/coding-coops", //URI for your mongo database
}