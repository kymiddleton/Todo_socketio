// ===============================================================================
// DATA
// Below data will hold all of the input items 'addTasks'
// Initially we just set it equal to an empty array.
// ===============================================================================

const addtasksArray = [
    {
        todoItem: " ",
        todoStatus: false
    },
    {
        todoItem: "Send Volunteer Schedule",
        todoStatus: true
    }
];

// Note how we export the array. This makes it accessible to other files using require.
module.exports = addtasksArray; 