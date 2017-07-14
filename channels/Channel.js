import React, { Component } from 'react';

class Channel extends Component{
    onClick(e){
        e.preventDefault();
        this.props.setChannel(this.props.channel);
        console.log(this.props.activeChannel);
    }
    render(){
        const active = this.props.channel === this.props.activeChannel ? 'active' : '';
        return(
            <li className={active}>
                <a onClick={this.onClick.bind(this)}>
                    {this.props.channel.name}
                </a>
            </li>
        )
    }
}

//Document expected properties (how should this component be used?)

Channel.propTypes = {
    channel: React.PropTypes.object.isRequired,
    setChannel: React.PropTypes.func.isRequired,
    activeChannel: React.PropTypes.object.isRequired
};

export default Channel