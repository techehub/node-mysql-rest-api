var addressRouter = require('express').Router()
var bodyparser = require('body-parser')
var con = require('./db')


addressRouter.use(bodyparser.json())
addressRouter.get("/address", (req, res) => {

    con.query("select * from user",
        function(err, result, fields) {
            if (err) {
                console.log(" somthing wrong !!!!!!")
                throw err;
            }
            res.json(result)
        });

})

addressRouter.get("/address/:id", (req, res) => {
    con.query("select * from user where id = ?", [req.params.id],
        function(err, result, fields) {
            if (err) {
                console.log(" somthing wrong !!!!!!")
                throw err;
            }
            res.json(result)
        });
})

addressRouter.post("/address", (req, res) => {
    params = req.body

    con.beginTransaction()
    con.query("insert into user ( fname, lname, email, phone) values (?,?,?,?) ", [params.firstname, params.lastname, params.email, params.phone],
        function(err, result, fields) {
            if (err) {
                console.log(" somthing wrong !!!!!!")
                throw err;
            }
            res.json(result)
        });
    con.commit()
        //res.end("aaaa")
})

addressRouter.put("/address/:id", (req, res) => {

    params = req.body
    userid = parseInt(req.params.id)

    con.beginTransaction()
    con.query("update user set fname =? , lname =?, email =? , phone =? where id = ? ", [params.firstname, params.lastname, params.email, params.phone, userid],
        function(err, result, fields) {
            if (err) {
                console.log(" somthing wrong !!!!!!")
                throw err;
            }
            res.json(result)
        });
    con.commit()

})

addressRouter.delete("/address/:id", (req, res) => {

    con.query("delete from user where id = ?", [req.params.id],
        function(err, result, fields) {
            if (err) {
                console.log(" somthing wrong !!!!!!")
                throw err;
            }
            res.json(result)
        });
})

module.exports = addressRouter