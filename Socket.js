import EventEmitter from 'events'

class Socket{
    constructor(ws = new WebSocket(), ee = new EventEmitter()){
        this.ws = ws;
        this.ee = ee;
        ws.onMessage = this.message.bind(this);
        ws.onOpen = this.open.bind(this);
        ws.onClose = this.close.bind(this);

    }

    on(name, fn) {
        this.ee.on(name, fn);
    }


    off(name, fn){
        this.ee.removeListener(name, fn);
    }

    emit(name, data){
        const message = JSON.stringify({name, data});
        this.ws.send(message);
    }

    message(e){
        try{
            const message = JSON.parse(e.data);
            this.ee.emit(message.name, message.data);
        }
        catch(err) {
            this.ee.emit('error', err);
        }
    }

    open(){
        console.log('open');
        this.ee.emit('connect');
    }

    close(){
        console.log('close');
        this.ee.emit('disconnected');
    }
}

export default Socket