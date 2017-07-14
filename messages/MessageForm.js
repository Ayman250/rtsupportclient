import React, {Component} from 'react';

class MessageForm extends Component{
    onSubmit(e){
        e.preventDefault();
        const node = this.refs.message;
        const message = node.value;
        this.props.addMessage(message);
        node.value='';
    }
    render(){
        let input;
        //only show input form if there is a channel selected
        if(this.props.activeChannel.id !== undefined){
            input = (
                <input
                    ref="message"
                    type="text"
                    className="form-control"
                    placeholder="Add Message..." />
            )
        }
        return(
            <form onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group">
                    {input}
                </div>
            </form>
        )
    }
}

MessageForm.PropTypes = {
    activeChannel: React.PropTypes.object.isRequired,
    addMessage: React.PropTypes.func.isRequired
};

export default MessageForm