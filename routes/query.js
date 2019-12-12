var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    var page = req.query.page || 0;
    var query = req.query.query || "all";
    res.render('query', {
        title: 'Pet Shop',
        page: page,
        query: query,
        funtionInitial: "query",
        idCliente: req.session.idCliente
    });
});
module.exports = router;
