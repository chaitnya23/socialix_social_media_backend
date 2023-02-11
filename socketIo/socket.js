

const createSocketIoConnection = (server) => {

    const io = require('socket.io')(server ,{

        cors:{
            origin:'*'
        }
    });

    console.log("connection created");

    io.on('connection', (socket) => {

        socket.on("connected" ,payload=>{
            console.log(payload); 
        })
        socket.on('create-notification', (payload) => {

            socket.emit('receive-notification', payload)  

        })
    })
}

module.exports = createSocketIoConnection;







