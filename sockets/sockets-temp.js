// const users = {}
// const socket = io();


module.exports = function (io) {
    
  io.on('connection', (socket) => {
      console.log("connected");
      
      socket.on('new-todo', (data) => {
          io.emit('emit-todo', data);
      })

      socket.on('update-todo', (data) => {
          io.emit('emit-todo', data);
      })
      
      socket.on('delete-todo', (data) => {
          io.emit('emit-todo', data);
      })

      console.log('connected');
  })
}





// socket.io connection
io.on('connection', (socket) => {
  console.log("Connected to Socket!!" + socket.id);
  // Receiving Todos from client
  socket.on('addTodo', (Todo) => {
    console.log('socketData: ' + JSON.stringify(Todo));
    todoController.addTodo(io, Todo);
  });
  // Receiving Updated Todo from client
  socket.on('updateTodo', (Todo) => {
    console.log('socketData: ' + JSON.stringify(Todo));
    todoController.updateTodo(io, Todo);
  });
  // Receiving Todo to Delete
  socket.on('deleteTodo', (Todo) => {
    console.log('socketData: ' + JSON.stringify(Todo));
    todoController.deleteTodo(io, Todo);
  });
})


socket.on('new-user', function (data) {
  users[data.name] = socket;
  io.emit('emit-users', Object.keys(users))
})



// const db = require("../models");

// module.exports = function(io) {
//   io.on('connection', function(socket) {
//     //SOCKET ROUTES
//     socket.on('send-item', function(data) {
//       db.Todo.create(data)
//       .then(function(data){
//         io.emit('display-item', data);  
//       })
//     })
//   });
// };



/*==================ADDTASKS TEMP FILE FOR CODE ==========================*/
// function addUpdateListener(element) {
//   $(element).on('click', function () {

//     let id = $(this).attr('data-id');
//     console.log("HERE");
//     if ($(this).attr('data-status') === "false") {
//       $.ajax({
//         url: `/api/todo/${id}`,
//         type: 'POST',
//         data: {
//           _id: id,
//           todoStatus: true
//         }
//       })
//         .then(function (data) {
//           socket.emit('update-todo', data)
//           button.attr('data-status', data.todoStatus)
//         });
//     } else {
//       $.ajax({
//         url: `/api/todo/${id}`,
//         type: 'PUT',
//         data: {
//           _id: id,
//           todoStatus: false
//         }
//       })
//         .then(function (data) {
//           socket.emit('update-todo', data)
//           button.attr('data-status', data.todoStatus)
//         });
//     }
//     toggleCheckbox(this);
//   });
// };