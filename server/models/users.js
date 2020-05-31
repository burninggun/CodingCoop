const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    login: {type: String},
    githubId: {type: Number},
    avatar_url: {type: String, default: 'https://history.ucr.edu/sites/g/files/rcwecm1916/files/styles/form_preview/public/blank-profile-picture-png.png?itok=MQ-iPuNG'},
    githubUrl: {type: String},
    name: {type:String},
    posts: {type: Array, default: []},
    upvoted: {type:Number, default:0} ,
    password: {type: String},
}, {collection: "users"})

module.exports = mongoose.model('userSchema', userSchema)