const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	const page = req.query.page || 0;
	res.render('index', {
		title: 'Chang Pierre',
		page: page,
		funtionInitial: "index",
		idCliente: req.session.idCliente
	});
});

module.exports = router;
