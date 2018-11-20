const mongoose = require('mongoose');

class RestfulAPI {
    constructor(resource, app, model) {
        this.resource = resource;
        this.app = app;
        this.model = model;
    }

    find() {
        this.app.get(`/api/${this.resource}`, (req, res) => {
            this.model.find({})
                .then(function (data) {
                    res.json(data);
                })
                .catch(function (err) {
                    res.json(err);
                })
        })
    }

    create() {
        this.app.post(`/api/${this.resource}`, (req, res) => {
            this.model.create(req.body)
                .then(function (data) {
                    res.json(data);
                })
                .catch(function (err) {
                    res.json(err);
                })
        })
    }

    delete(identifier) {
        this.app.delete(`/api/${this.resource}/:${identifier}`, (req, res) => {
            this.model.findByIdAndRemove(req.params[identifier])
                .then(data => res.json({ success: true }))
                .catch(err => res.json(err))
        });
    }

    update(identifier) {
        this.app.post(`/api/${this.resource}/:${identifier}`, (req, res) => {
// the correct identifier is arriving here (do console.log(req.params[identifier]) to verify)
// but the next section is simply getting the first item in the list...
            
// is this line the same as it was in the old version of the Todo app?
            this.model.findOneAndUpdate({_id : req.params[identifier]}, { todoStatus: req.body.todoStatus }, { new: true })

// Frazer commented out this line to see if it made a difference...
            // this.model.findOneAndUpdate({ [identifier]: req.body[identifier] }, { completed: req.body.completed }, { new: true })
                .then(function (dbTodo) {
                    console.log('---------In Rest Update-------');
                    res.json(dbTodo);
                })
                .catch(function (err) {
                    console.log(err); 
                    res.json(err);
                });
        });
    }
}

module.exports = RestfulAPI;