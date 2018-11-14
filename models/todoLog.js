const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TodoSchema = new Schema({

    todoItem: {
        type: String,
        trim: true,
        required: "Todo Item is Required"
    },
    todoStatus: {
        type: Boolean
    },
    // userCreate: {
    //     type: String,
    //     trim: true
    // },
    // userComplete: {
    //     type: String,
    //     trim: true
    // }
});
    // This creates our model from the above schema, using Mongoose's model method
    const todo = mongoose.model("todoLog", TodoSchema);
    // Export the Inventory model
    module.exports = todo;
