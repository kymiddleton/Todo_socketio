








const socket = io();

$(function () {
    const state = {
        toDoList: [],
    };

    $('#submit').on('click', function (event) {
        event.preventDefault();
        console.log('Submit works');

        const newTodo = {
            todoItem: $('#todo-input').val().trim(),
            todoStatus: false
        };

        if (newTodo.todoItem === '') {
            alert('Todo Item Required');
        }

        $.ajax({ 
            url: "/api/todo_list", 
            method: "POST", 
            data: newTodo
         })
            .then(function (data) {
            socket.emit('new-todo', data);
            console.log(data, "This should be the updated list");
            // Clear the form when submitting
            // getAllItems()
            $('#todo-input').val('');
            $('#todo-input').focus();
        });
    });
});

socket.on('emit-todo', function (data) {
    console.log(data, "This is the new todo that is being emitted from the backend")
    populateList(data);
});

//far fa-times-circle / circle with x for completed
//far fa-circle / empty circle not complete
function populateList(data) {
    // $('#addTasks').empty();
    // data.forEach((e, index) => {
        const listTag = $('<li>');
        const textDiv = $('<div>');
        if (e.todoStatus == true) {
            checkbox = $('<i class="far fa-times-circle">'); //checked completed
        } else {
            checkbox = $('<i class="far fa-circle">');//unchecked not completed
        }

        checkbox.attr('data-id', e._id);
        checkbox.attr('data-status', e.todoStatus);
        const button = $('<i class="fas fa-times">');//x for for delete

        listTag.append()
        listTag.append(checkbox);
        addUpdateListener(checkbox);

        listTag.append(textDiv);
        // listTag.append(button);

        textDiv.addClass('textDiv');
        textDiv.text(e.todoItem);

        button.addClass('delete');
        button.attr('data-id', e._id);

        $('#addTasks').append(listTag);

};
    addDeleteListener();


function toggleCheckbox(element) {
    if ($(element).hasClass('far fa-circle')) { // not completed box
        $(element).removeClass('far fa-circle');//not completed box
        $(element).addClass('far fa-times-circle');
    } else {
        $(element).removeClass('far fa-times-circle');//checked completed
        $(element).addClass('far fa-circle');//not completed box
    }
}

function addUpdateListener(element) {
    $(element).on('click', function () {
        let id = $(this).attr('data-id');
        let status = $(this).attr('data-status');

        if (status === "false") {
            status = true;
        } else {
            status = false;
        }

        const updateTask =
        {
            id: id,
            todoStatus: status
        }

        $.post('/api/update/todo_list', updateTask, function (data) {
            socket.emit('update-todo', data);
            // getAllItems();
        });

        toggleCheckbox(this);
    })
}

socket.on('emit-update', function (data) {
    console.log(data, "This is the updated todo being emitted from the backend")
    getAllItems();
});

function getAllItems() {
    $.get('/api/todo_list', function (data) {

        populateList(data);
    });
}

getAllItems();

function addDeleteListener() {
    $(".delete").on('click', function () {
        const deleteThisId = {
            id: $(this).attr('data-id')
        }

        $.post('/api/delete/todo_list', deleteThisId, function (data) {
            socket.emit('delete-todo', data);
            // getAllItems();
        });
    });
}

socket.on('emit-new', function(data) {
        getAllItems();
})