var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

    res.render('producto', {
        title: 'Chang Pierre',
        producto: req.query.producto,
        funtionInitial: "producto",
        idCliente: req.session.idCliente
    });
});
module.exports = router;
