import React, {Component} from 'react';
import Channel from './Channel.js'

class ChannelList extends Component {
    render() {
        return (
            <ul>{this.props.channels.map(channel => {
                return <Channel channel={channel}
                                setChannel={this.props.setChannel}
                                activeChannel={this.props.activeChannel}
                                key={channel.id}
                />
            })
            }</ul>

        );
    }
}

ChannelList.propTypes = {
    channels: React.PropTypes.array.isRequired,
    setChannel: React.PropTypes.func.isRequired,
    activeChannel: React.PropTypes.object.isRequired
};

export default ChannelList