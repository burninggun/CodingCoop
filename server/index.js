const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const keys = require('./config/keys');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


mongoose.connect(keys.mongoURI, function(error) {
    if (error) {
        throw error;
    }

    console.log("We are connected to the mlab database");
});

var InstructorSchema = {
    name: String,
    age: Number
}

var Instructor = mongoose.model('Instructors', InstructorSchema);

// AT A BASE LEVEL CREATING / INSERTING data into our collections for mongo
// var ryan = new Instructor({ name: 'Ryan', age: 24 });
// ryan.save();

// READING FROM OUR COLLECTIONS
// Instructor.find(function(err, instructors) {
//     if (err) return console.error(err);

//     console.log("These are all of our instructors", instructors);
// })

app.get('/', (req, res) => {
    console.log('i am listening on the mf server');
    res.send({
        hello: 'this works',
        test: 'is working',
        dataNeeded: {
            userID: '2342',
            post: {
                postID: "123",
                comments: {
                    commentID: "4123",
                    comment: "this makes no sense"
                }
            }
        }
    });
})


app.listen(PORT);


