var db = require("../models");

//routes
module.exports = function(app){
    // GET route for getting all of the posts
    app.get("/api/burgers", function(req, res) {
    
    db.burgers.findAll({}).then(function(dbburg){
        res.json(dbburg)
    });
        
});

 // POST route for saving a new todo
 app.post("/api/burgers", function(req, res){
     db.burgers.create({
         burger_name: req.body.burger_name,
         devoured: req.body.devoured
     }).then(function(dbburg){
         res.json(dbburg);
     });
 });

 app.put("/api/burgers", function(req, res){
     db.burgers.update(
         req.body,
         {
             where: {
                 id: req.body.id
             }
         }
     ).then(function(dbburg){
         res.json(dbburg);
     });
 });
};