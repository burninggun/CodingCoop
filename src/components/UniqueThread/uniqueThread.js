import React, {Component} from 'react';
import axios from 'axios'
import UpvoteComments from '../upvotecomments';
import Comments from '../comments';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';

const textAreaStyle={
    fontSize: '13px',
    height: '55px',
    marginBottom:'2px'
}
const formStyle={
    width:'100%'
}
const iframeStyle={
    width: '100%',
    height: '400px'
}

class Thread extends Component{
    constructor(props){
        super(props)
        this.state={
            comments:[],
            textInput:'',
            description:'',
            title: '' ,
            jsbin:'',
            threadID: this.props.threadID,
            alertStyle: { display: 'none' }
        }
        this.updateInput=this.updateInput.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
    }
    componentWillMount(){
        axios.post(`/posts/unique-thread`, { threadID: this.props.threadID } ).then( res => {
            console.log(res.data);
            const { ...rest } = res.data
            this.setState({
                ...this.state,
                ...rest
                })
                
        })
    }

    onSubmit(event){
        event.preventDefault()


        if (this.validCheck(this.state.textInput)){

            const submittedComment={
                comment:this.state.textInput,
                threadID: this.props.threadID
                }
            axios.post(`/comment/add`, submittedComment).then( res => {
                console.log(res.data);

                this.setState({
                    ...this.state,
                    ...res.data,
                    textInput:'',
                })
            })
        
        }
    }
    deletePost(event){
        axios.post(`/posts/delete`, {threadID: this.state.threadID} ).then(res => {
            if(!res.data){
            }
        })
    }


    validCheck(string){
        if(string.length > 0){
            this.setState({
                alertStyle: {display:'none'}
            })
            return true
        } else {
            this.setState({
                alertStyle: {display:'block'}
            })

            return false
        
        }
    }

    updateInput(event){
        this.setState({
            textInput: event.target.value
        })
    }

    authForm(){
        if(this.props.auth === false){
            return (
                <div className="jumbotron">
                    <h3 className="display text-center">Sign in to comment!</h3>
                    <p className="text-center"> <a href="/auth/github">Sign in with GitHub</a> to get the full CodingCoops experience</p>
                </div>
            )
        } else {
            return(
                <form style={formStyle} className="form-group" onSubmit={this.onSubmit} >
                    <textarea style={textAreaStyle} id="comment" className="form-control" value={this.state.textInput} onChange={this.updateInput} ></textarea>
                    <div style={this.state.alertStyle} className="alert alert-warning" role="alert"> Cannot leave comment empty! </div>

                    <button className="btn btn-danger btn-sm mt-2" >Add a comment</button>
                </form>    
            )
        }
    }

    render(){
        
        console.log(this.state);
        return(
            
                <div className="col-m-10 col-sm-10 justify-content-start pt-5 bg-white offset-md-2 pl-5 ">
                    <h2>{this.state.title}</h2>
                    <p><small className="text-muted" > {this.state.author} - Posted: {new Date(this.state.timestamp).toString()} </small></p>
                    <p>{this.state.description}</p>
                   
                    <div className="dropdown-divider mb-5"></div>
                    <Comments threadID={this.state.threadID} data={this.state} />
                    {this.authForm()}
                </div>
        )
    }
};

function mapStateToProps(state){
    return{
        user: state.user,
        auth: state.user.auth
    }
}

export default connect(mapStateToProps)(Thread);
