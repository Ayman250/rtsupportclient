import React, {Component} from 'react';
import fecha from 'fecha';

class Messages extends Component{

    render(){
        let message = this.props.message;
        let createdAt = fecha.format(message.createdAt, 'HH:mm:ss MM/DD/YY');
        return(
            <li className="message">
                <div className="Author">
                    <strong>{message.author + " "}</strong>
                    <i className="timeStamp">{createdAt}</i>
                </div>
                <div className="body">{message.body}</div>
            </li>
        )
    }
}

Messages.PropTypes = {
    message: React.PropTypes.object.isRequired
};

export default Messages