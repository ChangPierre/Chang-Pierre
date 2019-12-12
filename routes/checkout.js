var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

    res.render('checkout', {
        title: 'Chang Pierre',
        funtionInitial: "checkout",
        idCliente: req.session.idCliente
    });
});
module.exports = router;
