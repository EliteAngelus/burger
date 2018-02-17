// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Grabbing our models

var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

    // GET route for getting all of the todos
    app.get("/api/todos", function(req, res) {
        db.Todo.findAll({}).then(function(results) {
            // results are available to us inside the .then
            res.json(results);
        });



    });

    // POST route for saving a new todo. You can create a todo using the data on req.body
    app.post("/api/todos", function(req, res) {
        db.Todo.create({
            text: req.body.text,
            complete: req.body.complete,
        }).then(function(results) {
            // `results` here would be the newly created todo
            res.end();
        });
    });

    // DELETE route for deleting todos. You can access the todo's id in req.params.id
    app.delete("/api/todos/:id", function(req, res) {
        db.Todo.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbTodo) {
            res.json(dbTodo);
        });

    });

    // PUT route for updating todos. The updated todo will be available in req.body
    app.put("/api/todos", function(req, res) {
        console.log(req.body);
        var condition = 'id = ' + req.params.id;

        db.Todo.updateOne({
            devoured: true
        }, condition, function(data) {
            res.redirect('/');
        });

    });

}