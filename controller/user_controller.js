const express = require("express")
const router = express.Router()
const Users = require("../models/users")


// add a new Product 
router.post('/',function(req,res,next){
    Users.create(req.body).then(function(product){
        res.send(product);
    }).catch(next);
});


module.exports = router