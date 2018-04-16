import React, {Component} from 'react';
import axios from 'axios'
import UpvoteComments from './upvotecomments'



class Comments extends Component{
    constructor(props){
        super(props);
        this.state={
            commentLength:2,
            //allCommentsLength: this.props.data.comments.length
        }
        this.pointerStyle={
            cursor:'pointer'
        }

    }

    renderMoreComments(){
        this.setState({
            commentLength: this.state.commentLength + 3
        })    
    }

    minimizeComments(){
        this.setState({
            commentLength: 2
        })
    }

    viewMoreComments(){
        const {length } = this.props.data.comments
        if (length === this.state.commentLength && length !==2){
            return(
                <p style={this.pointerStyle} onClick={this.minimizeComments.bind(this)} className="badge pill badge-danger">Minimize Comments <span className="badge badge-light">{length}</span> </p>
            )
        }
         if (length >2){
            return(
                <p style={this.pointerStyle} onClick={this.renderMoreComments.bind(this)} className="badge pill badge-primary">View more comments <span className="badge badge-light">{length}</span> </p>
            )
        } else if (length >0){
            return(
                <small className="text-muted" >Comments ({length})</small>
            )
        } else if (length === 0){
            return (
                <p className="py-4" > No comments yet! </p>
            )
        }
    }



    render(){
        console.log(this.props)
        const commentArray = [];
        const allComments = this.props.data.comments.slice().reverse().map( (item, index) => {
            commentArray.push(
                    <div key={index} className="row">	
                        <div className="col-md-2 col-sm-2 col-2">	
                            <UpvoteComments threadID={this.props.data._id} data={item} />	
                        </div>	
                        <div className="col-md-10 col-sm-10 col-8 justify-content-start">	
                            <span><i className="fas fa-user-circle mr-2"></i>{item.name}</span>	
                            <p><small>{item.comment}</small></p>	
                        </div>	
                    </div>	
                    )
                } 
            )

        const fewComments=[];
        for (var i = this.state.commentLength-1; i>=-1; i--){
            fewComments.push(commentArray[i]);
        }
        const Comments = fewComments.map( (item, index) => {
            return (
                fewComments[index]
            )
        } )

        return(
            <div>
                {this.viewMoreComments()}
                {Comments}
                
            </div>

        )
    }

}



export default Comments