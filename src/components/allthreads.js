import React, { Component } from 'react';
import MinimizedThread from './minimizedThread/minimizedThread';
import FilterFeed from './filterFeed';
import axios from 'axios';
import '../assets/css/app.css'
import { Link } from 'react-router-dom'
class AllThreads extends Component {
    constructor(props){
        super(props);
        this.state = {
            oldField : null,
            postData : []
        }
        this.fetchDataFromServer = this.fetchDataFromServer.bind(this);
    }
    fetchDataFromServer(){
        if(this.state.oldField !== this.props.match.params.sort){
            axios.get(`/posts?field=${this.props.match.params.sort}`).then(res=>{
                if(res.data.confirmation){
                    this.setState({
                        postData: res.data.results,
                        oldField: this.props.match.params.sort
                    })
                }
            })    
        }
    }
    componentDidUpdate(){
        this.fetchDataFromServer();
    }
    componentDidMount(){
        this.fetchDataFromServer();
    }
    sortThread(object){
        return this.state.postData;
    } 

    render(){
        let threads = this.state.postData.map((item, index) => {
            return (
                <MinimizedThread data={item} key={index}/>
            )
        });
        if( this.state.postData.length === 0){
            threads = <div className="text-center my-4 border bg-white" >
                <div  className="py-5">
                    <h5>
                        There are currently no posts! Be there first!
                    </h5>
                        <Link to="/newPost" >Post a question</Link>
                </div>

            </div>
        }
        return (
            <div className="col-sm-12 col-md-10 mt-md-4 offset-md-2 pl-md-5 ">
                {/* <div className="row justify-content-end">
                    <FilterFeed/>
                </div> */}
                <div className="row">                    
                    <div className="col-md-10 col-12 thread-mobile">{threads}</div>
                    {/* <div className="col-1-sm d-none d-sm-block"></div> */}
                </div>
            </div>
        )
    }
}

export default AllThreads; 
