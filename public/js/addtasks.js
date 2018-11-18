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
            url: "/api/todo",
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
            })
    });
});

socket.on('emit-todo', function (data) {
    console.log(data, "This is the new todo that is being emitted from the backend")
    populateList(data);
});

//far fa-times-circle / circle with x for completed
//far fa-circle / empty circle not complete
function populateList(data) {
    // event.preventDefault();
    // $('#addTasks').empty();
    // data.forEach((data) => {
    const listTag = $('<li>');
    const textDiv = $('<div>');

    const button = $('<i class="far fa-circle">');
    //x for delete
    button.attr('data-status', data.todoStatus);

    listTag.append()
    listTag.append(button);
    addUpdateListener(button);

    listTag.append(textDiv);
    // listTag.append(button);

    textDiv.addClass('textDiv');
    textDiv.text(data.todoItem);

    button.addClass('delete');
    button.attr('data-id', data._id);

    $('#addTasks').append(listTag);
};
addDeleteListener();

//far fa-times-circle / circle with x for completed
//far fa-circle / empty circle not complete
function toggleCheckbox(element) {
    console.log('icon toggle function working')
    if ($(element).hasClass('far fa-circle')) { // not completed box
        $(element).removeClass('far fa-circle');//not completed box
        $(element).addClass('far fa-times-circle');//checked completed
    }
    // else {
    //     $(element).removeClass('far fa-times-circle');//checked completed
    //     $(element).addClass('far fa-circle');//not completed box
    // }
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

        $.post('/api/todo', updateTask, function (data) {
            socket.emit('update-todo', newTodo);
            console.log(updateTodo, "This should updated todo item")
            getAllItems();
        });

        socket.on('update-todo', function (data) {
            console.log(data, "This is the updated todo being emitted from the backend")
            // populateList(data);
        });


        toggleCheckbox(this);
    })
}

function getAllItems() {

    $.get('/api/todo', function (data) {

        $('#addTasks').empty();
        data.forEach((e) => {
            const listTag = $('<li>');
            const textDiv = $('<div>');
            if (e.todoStatus == true) {
                checkbox = $('<i class="far fa-times-circle">');//checked completed
            } else {
                checkbox = $('<i class="far fa-circle not complete">');//unchecked not completed
            }

            checkbox.attr('data-id', e._id);
            checkbox.attr('data-status', e.todoStatus);
            const button = $('<i class="far fa-times-circle">');
            //x for delete
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
        });
        addDeleteListener();
    });
}

getAllItems();

function addDeleteListener() {
    $(".delete").on('click', function () {
        const deleteThisId = {
            id: $(this).attr('data-id')
        }

        $.post('/api/delete/todo', deleteThisId, function (data) {
            getAllItems();
        });
    });
};
// delete(identifier) {
//     this.app.delete(`/api/${this.resource}/:${identifier}`, (req, res) => {
//         this.model.findByIDAndDelete(req.params[identifier])
//             .then(data => res.json({ success: true }))
//             .catch(err => res.json(err))
//     });
// }