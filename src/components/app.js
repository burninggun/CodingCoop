import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import '../assets/css/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './navigation/navbar';
import NewPost from './newPost';
import Sidebar from './sidebar';
import Thread from './uniqueThread';
import AllThreads from './allthreads';
import Leaderboard from './leaderboard';
import Register from './account/register';

const UniqueThread = ({ match }) => {
    return(
        <Thread threadID={match.params.threadID} />
    )
}

const App = () => {
    return(
        <div className="bg-light">
            <Navbar/>
            <div className="container">
                <div className="row">
                    <Sidebar/>
                    <Route exact path="/" render={ ()=> (
                        <Redirect to="/newest" />
                    )} />
                    <Route path="/:sort?" component={AllThreads} />
                    <Route path='/newPost' component={NewPost}/>
                    <Route path='/thread/:threadID' component={UniqueThread}  />
                    <Route path='/leaderboard' component={Leaderboard} />
                    <Route path="/register" component={Register}/>
                </div>
            </div>
        </div>
    )
}

export default App;
