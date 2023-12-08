const express = require("express")
const router = express.Router()
const Orders = require("../models/orders")


// add order
router.post('/', function (req, res, next) {
    const currentDateTime = new Date();

    const formattedDate = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(currentDateTime);

    const formattedTime = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false // 24-hour format
    }).format(currentDateTime);

    const result = `${formattedDate} ${formattedTime}`;
    Orders.create({"useremail": req.body.email, "useruid": req.body.uid, "order": req.body.order, "orderdate": formattedDate, "ordertime": formattedTime}).then(function (product) {
        res.status(200)
        res.send(product);
    }).catch(next);
});


module.exports = router