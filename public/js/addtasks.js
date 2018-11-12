$(function () {
    const state = {
        toDoList: [],
    };

    $('#submit').keypress(function (event) {
        event.preventDefault();
        console.log('Submit works');
        const keycode = (event.keycode ? event.keycode : event.which);
        if (keycode === '13'){
            alert ('The "enter" key was pressed');
        }

    // $('#submit').on('click', function (event) {
        // event.preventDefault();
        // console.log('Submit works');

        const newTodo = {
            todoItem: $('#todo-input').val().trim(),
            todoStatus: false
        };

        if (newTodo.todoItem === '') {
            alert('Todo Item Required');
        }

        $.ajax({ url: "/api/todo_list", method: "POST", data: newTodo }).then(function (data) {
            console.log(data, "This should be the updated list");
            // Clear the form when submitting
            getAllItems()
            $('#todo-input').val('');
            $('#todo-input').focus();
        });
    });
});

function populateList(data) {
    $('#addTasks').empty();
    data.forEach((e, index) => {
        const listTag = $('<li>');
        const textDiv = $('<div>');
        if (e.todoStatus == true) {
            checkbox = $('<i class="far fa-times-circle">');
        } else {
            checkbox = $('<i class="far fa-circle complete">');
        }

        checkbox.attr('data-id', e._id);
        checkbox.attr('data-status', e.todoStatus);
        const button = $('<i class="far fa-times-circle">');

        listTag.append()
        listTag.append(checkbox);
        addUpdateListener(checkbox);

        listTag.append(textDiv);
        listTag.append(button);

        textDiv.addClass('textDiv');
        textDiv.text(e.todoItem);

        // button.text('x');
        button.addClass('delete');
        button.attr('data-id', e._id);

        $('#addTasks').append(listTag);

    });
    addDeleteListener();
}

function toggleCheckbox(element) {
    if ($(element).hasClass('fa-circle')) {
        $(element).removeClass('fa-circle');
        $(element).addClass('fa-times-circle');
    } else {
        $(element).removeClass('fa-times-circle');
        $(element).addClass('fa-circle');
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
            getAllItems();
        });

        toggleCheckbox(this);
    })
}

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
            getAllItems();
        });

    });
}