import React, {Component} from 'react';
import './App.css';
import ChannelSection from './channels/ChannelSection'
import UserSection from './users/UserSection';
import MessageSection from './messages/MessageSection.js'
import Socket from './Socket.js'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            channels: [],
            users: [],
            messages: [],
            activeChannel: {},
            connected: false
        };
    }

    componentDidMount(){
        let ws = new WebSocket('ws://192.168.1.49:4000')
        let socket = this.socket = new Socket(ws);
        socket.on('connect', this.onConnect.bind(this));
        socket.on('disconnect', this.onDisconnect.bind(this));
        socket.on('channel add', this.onAddChannel.bind(this));
        socket.on('user add', this.onAddUser.bind(this));
        socket.on('user remove', this.onRemoveUser.bind(this));
        socket.on('user edit', this.onEditUser.bind(this));
        socket.on('message add', this.onMessageAdd.bind(this));
    }

    onConnect(){
        this.setState({connected: true});
        this.socket.emit('channel subscribe');
        this.socket.emit('user subscribe');
    }

    onDisconnect(){

        this.setState({connected: false});
    }


    onMessageAdd(message){
        let messages = this.state.messages;
        messages.push(message);
        this.setState({messages});
    }

    onAddUser(user){
        let users = this.state.users;
        users.push(user);
        this.setState({users});
    }

    onEditUser(editUser){
        let users = this.state.users;
        users = users.map(user => {
            if(editUser.id === user.id){
                return editUser;
            }
            return user;
        });
        this.setState({users});
    }

    onRemoveUser(removeUser){
        let users = this.state.users;
        users = users.filter(user => {
            return user.id !== removeUser.id;
        });
        this.setState({users});
    }

    onAddChannel(channel) {
        let channels = this.state.channels;
        channels.push(channel);
        this.setState({channels});
    }

    addChannel(name) {
        //Tells server to add channel. Server will respond with new channel info
        this.socket.emit('channel add', {name});

    }

    setChannel(activeChannel){
        this.setState({activeChannel});
        this.socket.emit('message unsubscribe');
        this.setState({messages: []});
        this.socket.emit('message subscribe',
            {channelId: activeChannel.id});
    }

    setUserName(name){
        this.socket.emit('user edit', {name});
        // TODO: Send to server
    }

    addMessage(body){
       let {activeChannel} = this.state;
       this.socket.emit('message add',
           {channelId: activeChannel.id, body});
    }

    render() {
        return (
            <div className='app'>
                <div className='nav'>
                    <ChannelSection
                        /* channels={this.state.channels}
                         activeChannel={this.state.activeChannel}
                         Let's use spread operator instead! */
                        /*Take all state properties that match
                          ChannelSection properties and autopasses them */
                        {...this.state}
                        setChannel={this.setChannel.bind(this)}
                        addChannel={this.addChannel.bind(this)}

                    />
                    <UserSection
                        {...this.state}
                        setUserName={this.setUserName.bind(this)}
                    />
                </div>
                    <MessageSection {...this.state} addMessage={this.addMessage.bind(this)}/>

            </div>
        )

    }
}

export default App;
