const users = {}

module.exports = function (io) {
    console.log('running');
    io.on('connection', function (socket) {

        //Socket Routes
        socket.on('new-todo', function(data){
            console.log(data);
            const socket1 = users[data.name];
            const socket2 = users[data.name2];

            socket1.emit('emit-todo', data);
            socket2.emit('emit-todo', data);
        })
        
        socket.on('new-user', function (data) {
            users[data.name]= socket;
            io.emit('emit-users', Object.keys(users))
        })

        console.log('connected');
    })
}